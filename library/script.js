const myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`
  }
}

function addBookToLibrary() {
}

function setup() {
  const dialog = document.querySelector("#dialog")
  const showDialogButton = document.querySelector(".show-dialog-btn")
  const closeDialogButton = document.querySelector(".close-dialog-btn")
  
  showDialogButton.addEventListener("click", () => {
    dialog.showModal()
  })

  closeDialogButton.addEventListener("click", () => {
    dialog.close()
  })
}

setup()