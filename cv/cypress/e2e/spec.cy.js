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

    it("modify cv experience on submit and redirect to cv preview page", () => {
      const expectedTitle = "Test Job Title - Test Company"
      const expectedDescription =
        "Test description - impact delivered at company"
      const expectedDateRange = "March 2024 - Current"
      cy.get('[data-cy="edit-action-icon"]').click()
      cy.get('[data-cy="edit-cv-work-experience-container"]').should(
        "be.visible"
      )
      cy.get('[data-cy="0-title"]').should("have.value", "Job Title - Company")
      cy.get('[data-cy="0-description"]').should(
        "have.value",
        "Key Responsibilities and Achievements. Value delivered to Company"
      )

      cy.get('[data-cy="0-title"]').clear().type(expectedTitle, { delay: 0 })
      cy.get('[data-cy="0-description"]')
        .clear()
        .type(expectedDescription, { delay: 0 })
      cy.get('[data-cy="0-dateRange"]')
        .clear()
        .type(expectedDateRange, { delay: 0 })
      cy.get('[data-cy="edit-cv-form-submit"]').click()
      cy.get('[data-cy="edit-cv-form"]').should("not.exist")

      cy.get('[data-cy="cv-work-experience"]').contains(expectedTitle)
      cy.get('[data-cy="cv-work-experience"]').contains(expectedDescription)
      cy.get('[data-cy="cv-work-experience"]').contains(expectedDateRange)
    })

    describe("work experience section", () => {
      it("work experience title should not be more than 100 characters long", () => {
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get('[data-cy="0-title"]')
          .clear()
          .type("a".repeat(101), { delay: 0 })
        cy.get('[data-cy="edit-cv-form-submit"]').click()

        cy.get('[data-cy="edit-cv-work-experience-container"]').should(
          "be.visible"
        )
        cy.get('[data-cy="edit-work-experience-title-0-error"]')
          .should("be.visible")
          .should(
            "have.text",
            "Work experience title cannot be more than 100 characters"
          )
      })

      it("work experience description should not be more than 300 characters long", () => {
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get('[data-cy="0-description"]')
          .clear()
          .type("a".repeat(301), { delay: 0 })
        cy.get('[data-cy="edit-cv-form-submit"]').click()

        cy.get('[data-cy="edit-cv-work-experience-container"]').should(
          "be.visible"
        )
        cy.get('[data-cy="edit-work-experience-description-0-error"]')
          .should("be.visible")
          .should(
            "have.text",
            "Work experience description cannot be more than 300 characters"
          )
      })

      it("display new work experience entry when add work experience button is clicked", () => {
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get(".work-experience-card").should("have.length", 1)
        cy.get('[data-cy="edit-cv-add-work-experience-btn"]').should(
          "be.visible"
        )
        cy.get('[data-cy="edit-cv-add-work-experience-btn"]').click()
        cy.get('[data-cy="edit-cv-work-experience-container"]').should(
          "be.visible"
        )
        cy.get(".work-experience-card").should("have.length", 2)
      })

      it("does not create new work experience when add experience button is clicked without edit cv form submission", () => {
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get(".work-experience-card").should("have.length", 1)
        cy.get('[data-cy="edit-cv-add-work-experience-btn"]').click()
        cy.get(".work-experience-card").should("have.length", 2)
        // navigate out of edit cv form without submission
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get('[data-cy="cv-work-experience"] .card').should("have.length", 1)
      })
    })

    describe("education section", () => {
      it("display default education section on first cv edit", () => {
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get('[data-cy="edit-cv-education-container"]').should("be.visible")
        cy.get('[data-cy="edit-cv-education-0-title"]').should("be.visible")
        cy.get('[data-cy="edit-cv-education-0-title"]').should(
          "have.value",
          "School - Certification"
        )
        cy.get('[data-cy="edit-cv-education-0-description"]').should(
          "be.visible"
        )
        cy.get('[data-cy="edit-cv-education-0-description"]').should(
          "have.value",
          "GPA - 5.0/5.0"
        )
        cy.get('[data-cy="edit-cv-education-0-dateRange"]').should("be.visible")
        cy.get('[data-cy="edit-cv-education-0-dateRange"]').should(
          "have.value",
          "Jan 2018 - Jan 2022"
        )
      })

      it("display title error message for too long input", () => {
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get('[data-cy="edit-cv-education-container"]').should("be.visible")
        cy.get('[data-cy="edit-cv-education-0-title"]')
          .clear()
          .type("a".repeat(151), { delay: 0 })
        cy.get('[data-cy="edit-education-history-title-0-error"]').should(
          "not.exist"
        )
        cy.get('[data-cy="edit-cv-form-submit"]').click()
        cy.get('[data-cy="edit-education-history-title-0-error"]').should(
          "be.visible"
        )
        cy.get('[data-cy="edit-education-history-title-0-error"]').should(
          "have.text",
          "Education Title cannot exceed 150 characters"
        )
      })

      it("display description error message for too long input", () => {
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get('[data-cy="edit-cv-education-container"]').should("be.visible")
        cy.get('[data-cy="edit-cv-education-0-description"]')
          .clear()
          .type("a".repeat(301), { delay: 0 })
        cy.get('[data-cy="edit-education-history-description-0-error"]').should(
          "not.exist"
        )
        cy.get('[data-cy="edit-cv-form-submit"]').click()
        cy.get('[data-cy="edit-education-history-description-0-error"]').should(
          "be.visible"
        )
        cy.get('[data-cy="edit-education-history-description-0-error"]').should(
          "have.text",
          "Education Description cannot exceed 300 characters"
        )
      })

      it("display date range error message for too long input", () => {
        cy.get('[data-cy="edit-action-icon"]').click()
        cy.get('[data-cy="edit-cv-education-container"]').should("be.visible")
        cy.get('[data-cy="edit-cv-education-0-dateRange"]')
          .clear()
          .type("a".repeat(51), { delay: 0 })
        cy.get('[data-cy="edit-education-history-dateRange-0-error"]').should(
          "not.exist"
        )
        cy.get('[data-cy="edit-cv-form-submit"]').click()
        cy.get('[data-cy="edit-education-history-dateRange-0-error"]').should(
          "be.visible"
        )
        cy.get('[data-cy="edit-education-history-dateRange-0-error"]').should(
          "have.text",
          "Education Date Range cannot exceed 50 characters"
        )
      })
    })
  })
})
