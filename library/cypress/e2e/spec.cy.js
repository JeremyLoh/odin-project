describe('homepage', () => {
  it('visits and clicks on create new book dialog button', () => {
    cy.visit('./index.html')
    cy.get('form').should('not.be.visible')
    cy.contains('Create a New Book').click()
    cy.get('form').should('be.visible')
  })
})