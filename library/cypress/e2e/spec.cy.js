describe('homepage', () => {
  beforeEach(() => {
    cy.visit('./index.html')
  })

  it('should open form when click on create new book dialog button', () => {
    cy.get('form').should('not.be.visible')
    cy.contains('Create a New Book').click()
    cy.get('form').should('be.visible')
  })

  it('should close form when close button on form is clicked', () => {
    cy.get('form').should('not.be.visible')
    cy.contains('Create a New Book').click()
    cy.get('form').should('be.visible')
    cy.get('.close-dialog-btn').click()
    cy.get('form').should('not.be.visible')
  })

  context('open form', () => {
    beforeEach(() => {
      openCreateBookDialog()
    })

    function openCreateBookDialog() {
      cy.contains('Create a New Book').click()
    }

    function enterValidUnreadBookInForm() {
      cy.get('input[id="title"]').type('Title One')
      cy.get('input[id="author"]').type('Author One')
      cy.get('input[id="pages"]').type('123')
      cy.get('input[id="no"]').click()
    }

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

    it('should submit form and close form', () => {
      enterValidUnreadBookInForm()
      cy.get('button[type="submit"]').click()
      cy.get('form').should('not.be.visible')
    })

    it('should submit form and create a new book', () => {
      enterValidUnreadBookInForm()
      cy.get('button[type="submit"]').click()
      cy.get(".book-card").should('be.visible')
    })

    it('should clear form after submit', () => {
      enterValidUnreadBookInForm()
      cy.get('button[type="submit"]').click()
      openCreateBookDialog()
      cy.get('input[id="title"]').should('have.value', '')
      cy.get('input[id="author"]').should('have.value', '')
      cy.get('input[id="pages"]').should('have.value', '')
    })

    it('should clear form when closed', () => {
      enterValidUnreadBookInForm()
      cy.get('.close-dialog-btn').click()
      openCreateBookDialog()
      cy.get('input[id="title"]').should('have.value', '')
      cy.get('input[id="author"]').should('have.value', '')
      cy.get('input[id="pages"]').should('have.value', '')
    })

    context('create book(s)', () => {
      it('should create two books', () => {
        enterValidUnreadBookInForm()
        cy.get('button[type="submit"]').click()
        cy.get('.book-card').should('have.length', 1)
  
        openCreateBookDialog()
        enterValidUnreadBookInForm()
        cy.get('button[type="submit"]').click()
        cy.get('.book-card').should('have.length', 2)
      })

      it('should display delete button on created book', () => {
        enterValidUnreadBookInForm()
        cy.get('button[type="submit"]').click()
        cy.get('.book-card').should('have.length', 1)
        cy.get('.book-card button.delete').should('have.text', 'Remove')
      })

      it('should remove single book using delete button', () => {
        enterValidUnreadBookInForm()
        cy.get('button[type="submit"]').click()
        cy.get('.book-card').should('have.length', 1)
        cy.get('.book-card button.delete').click()
        cy.get('.book-card').should('have.length', 0)

        openCreateBookDialog()
        enterValidUnreadBookInForm()
        cy.get('button[type="submit"]').click()
        cy.get('.book-card').should('have.length', 1)
      })

      it('should change read status of created book', () => {
        enterValidUnreadBookInForm()
        cy.get('button[type="submit"]').click()
        cy.get('.book-card').should('have.length', 1)
        cy.get('.book-card .read').should('have.text', 'Not Read')
        cy.get('.book-card button.changeReadStatus').click()
        cy.get('.book-card .read').should('have.text', 'Read')
      })
    })
  })
})