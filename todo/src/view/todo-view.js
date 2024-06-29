import { format, formatDistanceToNow, isBefore } from "date-fns"
import { displayCreateTodoForm } from "./todo-form"
import { TodoEvent, TodoPubsub } from "../pubsub/todo-pubsub"

export function renderTodos(todos, projectTitle) {
  // TODO 3) Expand a single todo to see/edit its details
  const main = document.querySelector("main")
  const container = document.querySelector(".todo-container") || document.createElement("div")
  container.classList.add("todo-container")
  container.innerHTML = ""

  const todoContainer = document.querySelector(".todo-card-container") || document.createElement("div")
  todoContainer.classList.add("todo-card-container")

  const createNewTodoButton = createNewTodoButtonElement(projectTitle)
  if (todos.length > 0) {
    todos.forEach((todo) => {
      const element = createTodoElement(todo, () => handleTodoDelete(todo, projectTitle))
      todoContainer.append(element)
    })
  } else {
    todoContainer.append(createNoTodoElement())
  }
  
  container.append(createNewTodoButton)
  container.append(todoContainer)
  main.append(container)
}

function handleTodoDelete(todo, projectTitle) {
  TodoPubsub.publish(TodoEvent.DELETE, {projectTitle, todo})
}

function createNewTodoButtonElement(projectTitle) {
  const button = document.createElement("button")
  button.classList.add("create-new-todo-btn")
  button.textContent = "Create New Todo"
  button.setAttribute("data-cy", "create-new-todo")
  button.addEventListener("click", () => {
    displayCreateTodoForm(projectTitle)
  })
  return button
}

function createTodoElement(todo, handleTodoDelete) {
  const card = document.createElement("div")
  card.classList.add("todo-card")
  card.classList.add(`${todo.priority.toLowerCase()}-priority`)

  const titleElement = createTitleElement(todo)
  const dueDateElement = createDueDateElement(todo)
  const priorityElement = createPriorityElement(todo)
  const descriptionElement = createDescriptionElement(todo)
  const notesElement = createNotesElement(todo)
  const deleteElement = createDeleteElement(handleTodoDelete)
  const expandElement = createExpandElement(card)
  card.append(titleElement, dueDateElement, priorityElement, descriptionElement, notesElement,
    deleteElement, expandElement)
  return card
}

function createNoTodoElement() {
  const element = document.createElement("p")
  element.textContent = "No todo available"
  element.classList.add("no-todo-message")
  element.setAttribute("data-cy", "no-todo-message")
  return element
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

function createDeleteElement(handleTodoDelete) {
  const deleteElement = document.createElement("button")
  deleteElement.textContent = "Delete"
  deleteElement.classList.add("delete-todo-button")
  deleteElement.addEventListener("click", () => {
    handleTodoDelete()
    deleteElement.closest(".todo-card").remove()
  })
  return deleteElement
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