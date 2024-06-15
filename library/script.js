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

const BookView = (function() {
  function setup() {
    const form = document.querySelector("form")
    const showDialogButton = document.querySelector(".show-dialog-btn")
    const closeDialogButton = document.querySelector(".close-dialog-btn")
    const dialog = document.querySelector("#dialog")
    form.addEventListener("submit", (event) => BookController.handleFormSubmit(event, form))
    showDialogButton.addEventListener("click", () => dialog.showModal())
    closeDialogButton.addEventListener("click", () => closeForm(form))
  }
  function closeForm(form) {
    const dialog = document.querySelector("#dialog")
    dialog.close()
    form.reset()
  }
  function renderBooks(books) {
    document.querySelectorAll(".book-card").forEach((e) => e.remove())
    books.forEach((book, index) => {
      const node = createBookElement(book, index)
      const container = document.querySelector("#book-container")
      container.appendChild(node)
    })
  }
  function createBookElement(book, index) {
    const bookElement = document.createElement("div")
    bookElement.dataset.libraryIndex = index
    bookElement.classList.add("book-card")
    const {
      title,
      author,
      pages,
      isRead,
      changeReadStatusButton,
      deleteButton
    } = createSubElements(book, index, bookElement)
    bookElement.append(title, author, pages, isRead, changeReadStatusButton)
    bookElement.appendChild(deleteButton)
    return bookElement
  }
  function createSubElements(book, index, bookElement) {
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
    changeReadStatusButton.addEventListener("click", () => {
      Library.toggleBookReadAtIndex(index)
      renderBooks(Library.getBooks())
    })
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete")
    deleteButton.textContent = "Remove"
    deleteButton.addEventListener("click", () => {
      Library.removeAtIndex(index)
      bookElement.remove()
    })
    return {title, author, pages, isRead, changeReadStatusButton, deleteButton}
  }
  return { setup, closeForm, renderBooks }
})()

const BookController = (function() {
  function handleFormSubmit(event, form) {
    event.preventDefault()
    const formData = new FormData(form)
    const title = formData.get("title")
    const author = formData.get("author")
    const pages = formData.get("pages")
    const read = formData.get("read")
    const book = new Book(title, author, pages, read)
    Library.addBook(book)
    BookView.renderBooks(Library.getBooks())
    BookView.closeForm(form)
  }
  function setup() {
    BookView.setup()
  }
  return { handleFormSubmit, setup }
})()

BookController.setup()
