// https://example.cypress.io

describe("homepage", () => {
  beforeEach(() => {
    cy.visit("./dist/index.html")
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
          .contains("1 todos")
        
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
        cy.get(".project-card").contains("0 todos")
        createNewTodo(newTodoTitle)
        cy.get(".project-card").contains("1 todos")
      })

      it("should increase project card todo count from zero to two", () => {
        const newTodoTitle = "new todo title"
        const projectName = "new project 2"
        createNewProject(projectName)
        getProjectCard(projectName).click()
        cy.get(".project-card").contains("0 todos")
        createNewTodo(newTodoTitle)
        createNewTodo(newTodoTitle)
        cy.get(".project-card").contains("2 todos")
      })
    })
  })
})