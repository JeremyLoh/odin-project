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

function setup() {
  const form = document.querySelector("form")
  const dialog = document.querySelector("#dialog")
  const showDialogButton = document.querySelector(".show-dialog-btn")
  const closeDialogButton = document.querySelector(".close-dialog-btn")
  
  form.addEventListener("submit", (event) => handleFormSubmit(event, form))
  showDialogButton.addEventListener("click", () => {
    dialog.showModal()
  })
  closeDialogButton.addEventListener("click", closeForm)
}

function closeForm() {
  const dialog = document.querySelector("#dialog")
  dialog.close()
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
  closeForm()
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
  books.forEach((book) => {
    const node = createBookElement(book)
    const container = document.querySelector("#book-container")
    container.appendChild(node)
  })
}

function createBookElement(book) {
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
  isRead.textContent = book.read ? "Read" : "Not Read"
  
  const bookElement = document.createElement("div")
  bookElement.classList.add("book-card")
  bookElement.appendChild(title)
  bookElement.appendChild(author)
  bookElement.appendChild(pages)
  bookElement.appendChild(isRead)
  return bookElement
}

setup()
