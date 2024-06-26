// https://example.cypress.io

describe("homepage", () => {
  beforeEach(() => {
    cy.visit("./dist/index.html")
  })

  context("demo project", () => {
    beforeEach(() => {
      cy.get(".project-card[data-cy='Demo']").click()
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
})