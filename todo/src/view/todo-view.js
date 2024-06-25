import { format, formatDistanceToNow, isBefore } from "date-fns"

export function renderTodos(todos) {
  // TODO
  // 2) View all todos in each project (probably just the title and due date... perhaps changing color for different priorities)
  // 3) Expand a single todo to see/edit its details
  // 4) Delete a todo
  const main = document.querySelector("main")
  const container = document.querySelector(".todo-container") || document.createElement("div")
  container.classList.add("todo-container")
  container.innerHTML = ""
  todos.forEach((todo) => container.append(createTodoElement(todo)))
  main.append(container)
}

function createTodoElement(todo) {
  const card = document.createElement("div")
  card.classList.add("todo-card")
  card.classList.add(`${todo.priority.toLowerCase()}-priority`)

  const titleElement = createTitleElement(todo)
  const dueDateElement = createDueDateElement(todo)
  const priorityElement = createPriorityElement(todo)
  const descriptionElement = createDescriptionElement(todo)
  const notesElement = createNotesElement(todo)
  const expandElement = createExpandElement(card)
  card.append(titleElement, dueDateElement, priorityElement, descriptionElement, notesElement, expandElement)
  return card
}

function getCollapsableElements(card) {
  return [
    card.querySelector(".todo-description"),
    card.querySelector(".todo-notes"),
  ]
}

function createTitleElement(todo) {
  const titleElement = document.createElement("h4")
  titleElement.textContent = todo.title
  titleElement.classList.add("todo-title")
  return titleElement
}

function createDueDateElement(todo) {
  const dueDateElement = document.createElement("p")
  dueDateElement.textContent = isBefore(todo.dueDate, new Date())
    ? `${formatDistanceToNow(todo.dueDate)} past due date (${format(todo.dueDate, "d LLL yyyy")})`  
    : `due in ${formatDistanceToNow(todo.dueDate)} (${format(todo.dueDate, "d LLL yyyy")})`
  dueDateElement.classList.add("todo-due-date")
  return dueDateElement
}

function createPriorityElement(todo) {
  const priorityElement = document.createElement("p")
  priorityElement.textContent = `${todo.priority} priority`
  priorityElement.classList.add("todo-priority")
  return priorityElement
}

function createDescriptionElement(todo) {
  const descriptionElement = document.createElement("p")
  descriptionElement.textContent = todo.description.length === 0
    ? `Description: Not Available`
    : `Description: ${todo.description}`
  descriptionElement.classList.add("todo-description")
  descriptionElement.classList.add("collapsed")
  return descriptionElement
}

function createNotesElement(todo) {
  const notesElement = document.createElement("textarea")
  notesElement.textContent = `Notes: ${todo.notes}`
  notesElement.classList.add("todo-notes")
  notesElement.classList.add("collapsed")
  notesElement.setAttribute("readonly", "")
  notesElement.setAttribute("rows", "8")
  return notesElement
}

function createExpandElement(card) {
  function handleExpandClick() {
    getCollapsableElements(card).forEach((element) => 
      element.classList.contains("collapsed")
        ? element.classList.remove("collapsed")
        : element.classList.add("collapsed")
    )
    if (expandElement.textContent === "Expand") {
      expandElement.textContent = "Collapse"
    } else {
      expandElement.textContent = "Expand"
    }
  }

  const expandElement = document.createElement("button")
  expandElement.textContent = "Expand"
  expandElement.classList.add("expand-button")
  expandElement.addEventListener("click", handleExpandClick)
  return expandElement
}