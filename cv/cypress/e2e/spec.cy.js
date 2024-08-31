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

  describe("edit cv", () => {
    it("click on edit action icon displays edit cv form", () => {
      cy.get('[data-cy="edit-cv-form"]').should("not.exist")
      cy.get('[data-cy="edit-action-icon"]').click()
      cy.get('[data-cy="edit-cv-form"]').should("exist")
      cy.get('[data-cy="edit-cv-name"]').should("exist")
    })

    it("should not allow form submission if name is blank", () => {
      cy.get('[data-cy="edit-action-icon"]').click()
      cy.get('[data-cy="edit-cv-name"]').should("exist")
      cy.get('[data-cy="edit-cv-name"]').clear()
      cy.get('[data-cy="edit-cv-name-error"]').should("not.exist")
      cy.get('[data-cy="edit-cv-form-submit"]').click()
      cy.get('[data-cy="edit-cv-name-error"]').should("be.visible")
    })

    it("should not allow form submission if contact summary is too long", () => {
      const summary = "a".repeat(151)
      cy.get('[data-cy="edit-action-icon"]').click()
      cy.get('[data-cy="edit-cv-name"]').clear().type("test name")
      cy.get('[data-cy="edit-cv-contact-summary"]')
        .clear()
        .type(summary, { delay: 0 })
      cy.get('[data-cy="edit-cv-contact-summary-error"]').should("not.exist")
      cy.get('[data-cy="edit-cv-form-submit"]').click()
      cy.get('[data-cy="edit-cv-contact-summary-error"]').should("be.visible")
    })

    it("should populate default values for cv form on first visit", () => {
      cy.get('[data-cy="edit-action-icon"]').click()
      cy.get('[data-cy="edit-cv-name"]').should("have.value", "YOUR NAME")
      cy.get('[data-cy="edit-cv-contact-summary"]').should(
        "have.value",
        "Role | Location | Phone Number | Email | URL"
      )
    })

    it("modify cv name and contact summary on submit and redirect to cv preview page", () => {
      const expectedCvName = "Test name"
      const expectedCvContactSummary = "test contact summary"
      cy.get('[data-cy="edit-action-icon"]').click()
      cy.get('[data-cy="edit-cv-name"]').clear().type(expectedCvName)
      cy.get('[data-cy="edit-cv-contact-summary"]')
        .clear()
        .type(expectedCvContactSummary)
      cy.get('[data-cy="edit-cv-form-submit"]').click()
      cy.get('[data-cy="edit-cv-form"]').should("not.exist")

      cy.get('[data-cy="cv-name"]').contains(expectedCvName)
      cy.get('[data-cy="cv-contact-summary"]').contains(
        expectedCvContactSummary
      )
    })
  })
})
