const APP_URL = "http://localhost:3000/"

describe("cv", () => {
  it("loads website", () => {
    cy.visit(APP_URL)
  })
})
