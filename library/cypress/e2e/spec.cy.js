describe('homepage', () => {
  beforeEach(() => {
    cy.visit('./index.html')
  })

  it('visits and clicks on create new book dialog button', () => {
    cy.get('form').should('not.be.visible')
    cy.contains('Create a New Book').click()
    cy.get('form').should('be.visible')
  })

  context('open form', () => {
    beforeEach(() => {
      cy.contains('Create a New Book').click()
    })

    it('should allow only number input in form for pages input', () => {
      cy.get('input[id="pages"]').type('b 12a')
      cy.get('input[id="pages"]').should('have.value', '12')
    })
  
    it('should allow text input for title and author', () => {
      cy.get('input[id="title"]').type('my title with 123')
      cy.get('input[id="title"]').should('have.value', 'my title with 123')
      
      cy.get('input[id="author"]').type('Author 123')
      cy.get('input[id="author"]').should('have.value', 'Author 123')
    })
  
    it('should allow book read change', () => {
      cy.get('input[id="no"]').should('be.checked')
      cy.get('input[id="yes"]').click()
      cy.get('input[id="yes"]').should('be.checked')
      cy.get('input[id="no"]').should('not.be.checked')

      cy.get('input[id="no"]').click()
      cy.get('input[id="no"]').should('be.checked')
      cy.get('input[id="yes"]').should('not.be.checked')
    })
  })
})