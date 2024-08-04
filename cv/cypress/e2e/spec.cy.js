const APP_URL = "http://localhost:3000/"

describe("cv", () => {
  beforeEach(() => {
    cy.visit(APP_URL)
  })

  it("loads website", () => {
    cy.get('[data-cy="header"]').should("exist")
    cy.get('[data-cy="header"]').contains("My CV")
  })

  it("display action toolbar", () => {
    cy.get('[data-cy="print-action-icon"]').should("exist")
    cy.get('[data-cy="edit-action-icon"]').should("exist")
  })

  it("display cv default values", () => {
    cy.get('[data-cy="cv-container"]').should("exist")
    cy.get('[data-cy="cv-name"]').contains("YOUR NAME")
    cy.get('[data-cy="cv-contact-summary"]').contains(
      "Role | Location | Phone Number | Email | URL"
    )

    cy.get('[data-cy="cv-work-experience"]').contains("WORK EXPERIENCE")
    cy.get('[data-cy="cv-work-experience"]').contains("Job Title - Company")
    cy.get('[data-cy="cv-work-experience"]').contains("Jan 2022 - Current")
    cy.get('[data-cy="cv-work-experience"]').contains(
      "Key Responsibilities and Achievements. Value delivered to Company"
    )

    cy.get('[data-cy="cv-education"]').contains("EDUCATION")
    cy.get('[data-cy="cv-education"]').contains("School - Certification")
    cy.get('[data-cy="cv-education"]').contains("Jan 2018 - Jan 2022")
    cy.get('[data-cy="cv-education"]').contains("GPA - 5.0/5.0")

    cy.get('[data-cy="cv-achievements"]').contains("ACHIEVEMENTS")
    cy.get('[data-cy="cv-achievements"]').contains("First Achievement")
    cy.get('[data-cy="cv-achievements"]').contains("Jan 2016")
    cy.get('[data-cy="cv-achievements"]').contains("Achievement Description")
  })
})
