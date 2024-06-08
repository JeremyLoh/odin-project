const myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`
  }
  this.toggleReadStatus = function() {
    this.read = this.read === "true" ? "false" : "true"
  }
}

function setup() {
  const form = document.querySelector("form")
  const dialog = document.querySelector("#dialog")
  const showDialogButton = document.querySelector(".show-dialog-btn")
  const closeDialogButton = document.querySelector(".close-dialog-btn")
  
  form.addEventListener("submit", (event) => handleFormSubmit(event, form))
  showDialogButton.addEventListener("click", () => {
    dialog.showModal()
  })
  closeDialogButton.addEventListener("click", () => closeForm(form))
}

function closeForm(form) {
  const dialog = document.querySelector("#dialog")
  dialog.close()
  form.reset()
}

function handleFormSubmit(event, form) {
  event.preventDefault()
  const formData = new FormData(form)
  const title = formData.get("title")
  const author = formData.get("author")
  const pages = formData.get("pages")
  const read = formData.get("read")
  const book = new Book(title, author, pages, read)
  addBookToLibrary(book)
  closeForm(form)
}

function addBookToLibrary(book) {
  if (book.title.trim() === "" || book.author.trim() === "") {
    return
  }
  myLibrary.push(book)
  renderLibraryBooks(myLibrary)
}

function renderLibraryBooks(books) {
  document.querySelectorAll(".book-card").forEach((e) => e.remove())
  books.forEach((book, index) => {
    const node = createBookElement(book, index)
    const container = document.querySelector("#book-container")
    container.appendChild(node)
  })
}

function createBookElement(book, index) {
  const title = document.createElement("p")
  title.classList.add("title")
  title.textContent = book.title
  const author = document.createElement("p")
  author.classList.add("author")
  author.textContent = book.author
  const pages = document.createElement("p")
  pages.classList.add("pages")
  pages.textContent = book.pages + " pages"
  const isRead = document.createElement("p")
  isRead.classList.add("read")
  isRead.textContent = book.read === "true" ? "Read" : "Not Read"

  const changeReadStatusButton = document.createElement("button")
  changeReadStatusButton.classList.add("changeReadStatus")
  changeReadStatusButton.textContent = "Toggle Read Status"
  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete")
  deleteButton.textContent = "Remove"
  
  const bookElement = document.createElement("div")
  bookElement.dataset.libraryIndex = index
  bookElement.classList.add("book-card")
  bookElement.appendChild(title)
  bookElement.appendChild(author)
  bookElement.appendChild(pages)
  bookElement.appendChild(isRead)
  deleteButton.addEventListener("click", () => {
    myLibrary.splice(index, 1)
    bookElement.remove()
  })
  bookElement.appendChild(deleteButton)
  changeReadStatusButton.addEventListener("click", () => {
    myLibrary[index].toggleReadStatus()
    renderLibraryBooks(myLibrary)
  })
  bookElement.appendChild(changeReadStatusButton)
  return bookElement
}

setup()
