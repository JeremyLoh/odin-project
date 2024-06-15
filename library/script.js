class Library {
  static books = []
  static addBook(book) {
    if (book.title.trim() === "" || book.author.trim() === "") {
      return
    }
    Library.books.push(book)
  }
  static getBooks() {
    return Library.books
  }
  static removeAtIndex(index) {
    Library.books.splice(index, 1)
  }
  static toggleBookReadAtIndex(index) {
    Library.books[index].toggleReadStatus()
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'read' : 'not read yet'}`
  }
  toggleReadStatus() {
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
  Library.addBook(book)
  renderLibraryBooks(Library.getBooks())
  closeForm(form)
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
  changeReadStatusButton.addEventListener("click", () => {
    Library.toggleBookReadAtIndex(index)
    renderLibraryBooks(Library.getBooks())
  })
  bookElement.appendChild(changeReadStatusButton)
  deleteButton.addEventListener("click", () => {
    Library.removeAtIndex(index)
    bookElement.remove()
  })
  bookElement.appendChild(deleteButton)
  return bookElement
}

setup()
