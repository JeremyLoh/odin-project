// https://example.cypress.io

describe("homepage", () => {
  beforeEach(() => {
    cy.visit("./dist/index.html")
    cy.clearLocalStorage()
  })

  context("project", () => {
    function clickCreateProjectButton() {
      cy.get("[data-cy='create-project-button']").should("be.visible").and("be.enabled")
        .click()
      cy.get("[data-cy='create-project-form']").should("be.visible")
    }
    function enterProjectDetails(name) {
      cy.get("[data-cy='name-input-project-form']").type(name)
    }
    function getProjectSubmitButton() {
      return cy.get("[data-cy='submit-btn-project-form']")
    }
    function getProjectCard(name) {
      return cy.get(`.project-card[data-cy='${name}']`)
    }

    context("demo project", () => {
      beforeEach(() => {
        getProjectCard("Demo").click()
      })
  
      it("should display sample todo in Demo project", () => {
        cy.get(".todo-card .todo-title").should("be.visible").and("have.text", "First Low Priority Todo")
        cy.get(".todo-card .todo-due-date").should("be.visible").contains("(14 Feb 2024)")
        cy.get(".todo-card .todo-priority").should("be.visible").and("have.text", "Low priority")
        cy.get(".todo-card .todo-description").should("not.be.visible")
        cy.get(".todo-card .todo-notes").should("not.be.visible")
        cy.get(".todo-card .expand-button").should("be.visible").and("be.enabled")
      })
    
      it("should expand sample todo when expand button is clicked", () => {
        cy.get(".todo-card .expand-button").should("be.visible").and("be.enabled")
          .and("have.text", "Expand")
          .click()
        cy.get(".todo-card .todo-description").should("be.visible").and("have.text", "Description: Not Available")
        cy.get(".todo-card .todo-notes").should("be.visible").contains("My First Todo Note")
      })
    
      it("should collapse sample todo when expand button is clicked", () => {
        cy.get(".todo-card .expand-button").should("be.visible").and("be.enabled")
          .and("have.text", "Expand")
          .click()
        cy.get(".todo-card .expand-button").should("be.visible").and("be.enabled")
          .and("have.text", "Collapse")
          .click()
        cy.get(".todo-card .todo-description").should("not.be.visible").and("have.text", "Description: Not Available")
        cy.get(".todo-card .todo-notes").should("not.be.visible").contains("My First Todo Note")
      })
    })

    context("create new project", () => {
      it("should display new project form when 'Create Project' button is clicked", () => {
        const projectName = "testProjectName"
        clickCreateProjectButton()
        enterProjectDetails(projectName)
        getProjectSubmitButton().should("be.visible").and("be.enabled")
      })

      it("should create new project when create project form is submitted", () => {
        const projectName = "testProjectName"
        clickCreateProjectButton()
        enterProjectDetails(projectName)
        getProjectSubmitButton().click()

        cy.get("[data-cy='create-project-form']").should("not.exist")
        // should navigate to view all projects screen and display new project
        getProjectCard(projectName).should("be.visible")
      })

      it("should prevent project creation with project name that already exists", () => {
        const projectName = "testProjectName"
        const expectedAlertMessage = "Did not create project as project name already exists"
        const alertStub = cy.stub()
        cy.on("window:alert", alertStub)

        clickCreateProjectButton()
        enterProjectDetails(projectName)
        getProjectSubmitButton().click()

        clickCreateProjectButton()
        enterProjectDetails(projectName)
        getProjectSubmitButton()
          .click()
          .then(() => {
            expect(alertStub).to.be.calledOnce
            expect(alertStub.getCall(0)).to.be.calledWith(expectedAlertMessage)
          })
      })
  
      it("should prevent project creation with name consisting of whitespace", () => {
        const projectName = "     "
        const expectedAlertMessage = "Please provide a project name"
        const alertStub = cy.stub()
        cy.on("window:alert", alertStub)

        clickCreateProjectButton()
        enterProjectDetails(projectName)
        getProjectSubmitButton()
          .click()
          .then(() => {
            expect(alertStub).to.be.calledOnce
            expect(alertStub.getCall(0)).to.be.calledWith(expectedAlertMessage)
          })
      })

      it("should navigate to view all projects when 'View projects' nav button is clicked", () => {
        const projectName = "test second project"
        // create second project
        cy.get(".project-grid").find(".project-card").should("have.length", 1)
        clickCreateProjectButton()
        enterProjectDetails(projectName)
        getProjectSubmitButton()
          .click()
        cy.get(".project-grid").find(".project-card").should("have.length", 2)
        
        // click demo project to display only demo project
        getProjectCard("Demo").click()
        cy.get(".project-grid").find(".project-card").should("have.length", 1)
          .contains("Demo")
          .parent()
          .contains("1 todo")
        
        // click on "View projects" button should display all two projects
        cy.get("button[data-cy='view-projects-button']").should("be.visible").and("be.enabled")
          .click()
        cy.get(".project-grid").find(".project-card").should("have.length", 2)
        // todo card should not be shown
        cy.get(".todo-container").should("not.exist")
        cy.get(".todo-card").should("not.exist")
      })
    })
  
    context("empty project", () => {
      function createNewProject(title) {
        clickCreateProjectButton()
        enterProjectDetails(title)
        getProjectSubmitButton().click()
      }
      function createNewTodo(title) {
        cy.get("button[data-cy='create-new-todo']").click()
        cy.get("[data-cy='new-todo-title']").type(title)
        cy.get("[data-cy='new-todo-submit-button']").click()
      }

      it("should delete project when delete button on project card is clicked", () => {
        const projectName = "new project 2"
        getProjectCard(projectName).should("not.exist")
        createNewProject(projectName)
        getProjectCard(projectName).find(".delete-project-button").click()
        getProjectCard(projectName).should("not.exist")
      })

      it("should display no todo available message on project card click", () => {
        const projectName = "new project 2"
        createNewProject(projectName)
        getProjectCard(projectName).click()
        cy.get("[data-cy='no-todo-message']").should("be.visible")
      })

      it("should display create new todo button", () => {
        const projectName = "new project 2"
        createNewProject(projectName)
        getProjectCard(projectName).click()
        cy.get("button[data-cy='create-new-todo']").should("be.visible")
      })

      it("should display create new todo form on click of create new todo button", () => {
        const projectName = "new project 2"
        createNewProject(projectName)
        getProjectCard(projectName).click()
        cy.get("button[data-cy='create-new-todo']").click()
        cy.get("form[data-cy='create-new-todo-form']").should("be.visible")
      })

      it("should create a new todo when todo form is submitted", () => {
        const newTodoTitle = "new todo title"
        const projectName = "new project 2"
        createNewProject(projectName)
        getProjectCard(projectName).click()
        cy.get("todo-card-container").should("not.exist")

        createNewTodo(newTodoTitle)
        cy.get(".todo-card-container")
          .find(".todo-card")
          .should("have.length", 1)
          .and("contain.text", newTodoTitle)
      })
      
      it("should increase project card todo count from zero to one", () => {
        const newTodoTitle = "new todo title"
        const projectName = "new project 2"
        createNewProject(projectName)
        getProjectCard(projectName).click()
        cy.get(".project-card").contains("0 todo")
        createNewTodo(newTodoTitle)
        cy.get(".project-card").contains("1 todo")
      })

      it("should increase project card todo count from zero to two", () => {
        const newTodoTitle = "new todo title"
        const projectName = "new project 2"
        createNewProject(projectName)
        getProjectCard(projectName).click()
        cy.get(".project-card").contains("0 todo")
        createNewTodo(newTodoTitle)
        createNewTodo(newTodoTitle)
        cy.get(".project-card").contains("2 todos")
      })

      context("localStorage", () => {
        it("should save created project and load it on page refresh", () => {
          const projectName = "new project 2"
          getProjectCard(projectName).should("not.exist")
          
          createNewProject(projectName)
          getProjectCard(projectName).should("exist")
          
          cy.reload()
          getProjectCard(projectName).should("exist")
        })

        it("should create todo and show created todo on page refresh", () => {
          const projectName = "new project 2"
          const todoTitle = "new todo title"
          getProjectCard(projectName).should("not.exist")
          createNewProject(projectName)
          getProjectCard(projectName).click()
          createNewTodo(todoTitle)
          cy.get(".project-card").contains("1 todo")
          
          cy.reload()
          getProjectCard(projectName).click()
          cy.get(".project-card").contains("1 todo")
          cy.get(".todo-title").should("have.text", todoTitle)
        })

        it("should update todo and show updated todo on page refresh", () => {
          const projectName = "new project 2"
          const todoTitle = "new todo title"
          const updatedTodoTitle = "updated todo title"
          getProjectCard(projectName).should("not.exist")
          createNewProject(projectName)
          getProjectCard(projectName).click()
          createNewTodo(todoTitle)
          cy.get(".project-card").contains("1 todo")

          cy.get(".todo-card .expand-button").click()
          cy.get(".todo-card .todo-title").clear().type(updatedTodoTitle)
          cy.get(".todo-card .save-todo-button").click()

          cy.reload()
          getProjectCard(projectName).click()
          cy.get(".todo-card .todo-title").should("have.text", updatedTodoTitle)
        })

        it("should delete todo and not show deleted todo on page refresh", () => {
          const projectName = "new project 2"
          const todoTitle = "new todo title"
          getProjectCard(projectName).should("not.exist")
          createNewProject(projectName)
          getProjectCard(projectName).click()
          createNewTodo(todoTitle)
          cy.get(".project-card").contains("1 todo")

          cy.reload()
          getProjectCard(projectName).click()
          cy.get(".todo-card").find(".delete-todo-button").click()

          cy.reload()
          getProjectCard(projectName).click()
          cy.get(".project-card").contains("0 todo")
        })
      })

      context("modify todo", () => {
        it("should edit existing todo title", () => {
          const newTodoTitle = "new todo title"
          const updatedTodoTitle = "test todo updated title"
          const projectName = "new project 2"
          createNewProject(projectName)
          getProjectCard(projectName).click()
          createNewTodo(newTodoTitle)
          cy.get(".todo-title").should("not.have.attr", "contenteditable")
          cy.get(".todo-card .expand-button").should("be.visible").and("be.enabled")
            .click()
          cy.get(".todo-title").should("have.attr", "contenteditable")
          cy.get(".todo-title").clear().type(updatedTodoTitle)
          cy.get(".save-todo-button").click()
  
          cy.get("button[data-cy='view-projects-button']").click()
          getProjectCard(projectName).click()
          cy.get(".todo-title").should("have.text", updatedTodoTitle)
        })

        it("should delete todo when delete button on todo card is clicked", () => {
          const newTodoTitle = "new todo title"
          const projectName = "new project 2"
          createNewProject(projectName)
          getProjectCard(projectName).click()
          createNewTodo(newTodoTitle)
          cy.get(".project-card").contains("1 todo")
  
          cy.get(".todo-card").find(".delete-todo-button").click()
          cy.get(".project-card").contains("0 todo")
        })
      })
    })
  })
})