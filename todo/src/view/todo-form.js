import { PriorityLevel, Todo } from "../model/todo"
import { TodoEvent, TodoPubsub } from "../todo-pubsub"

const { format } = require("date-fns") 

export function displayCreateForm(projectTitle) {
    // TODO create the form in a modal instead of adding directly on page
  const containerSelector = `${projectTitle}-form-container`
  let container = document.querySelector(containerSelector)
  if (container == null) {
    const main = document.querySelector("main")
    container = document.createElement("div")
    container.classList.add(containerSelector)
    main.append(container)
  } else {
    container.innerHTML = ""
  }

  const form = document.createElement("form")
  form.classList.add("create-todo-form")
  const formTitleElement = document.createElement("h2")
  formTitleElement.textContent = `${projectTitle}: What todo?`

  const titleContainer = createInputElement("Title")
  const descriptionContainer = createInputElement("Description")
  const dueDateContainer = createDateElement("Due Date")
  const priorityContainer = createPriorityElement(
    [PriorityLevel.LOW, PriorityLevel.MEDIUM, PriorityLevel.HIGH])
  const notesContainer = createNotesElement()
  const submitButton = document.createElement("button")
  submitButton.setAttribute("type", "submit")
  submitButton.textContent = "Create New Todo"
  
  setRequiredInput(titleContainer)
  form.append(formTitleElement, titleContainer, descriptionContainer, dueDateContainer,
    priorityContainer, notesContainer, submitButton)
  form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const title = formData.get("Title")
    const description = formData.get("Description")
    const dueDate = formData.get("Due Date")
    const priority = formData.get("Priority")
    const notes = formData.get("Note")
    const todo = new Todo(title, description, dueDate, priority, notes)
    TodoPubsub.publish(TodoEvent.ADD, {projectTitle, todo})
  })
  
  container.append(form)
}

function createInputElement(inputName) {
  const inputContainer = document.createElement("div")
  inputContainer.classList.add("form-input-container")
  const label = document.createElement("label")
  label.setAttribute("for", inputName)
  label.textContent = inputName
  const input = document.createElement("input")
  input.setAttribute("type", "text")
  input.setAttribute("name", inputName)
  inputContainer.append(label, input)
  return inputContainer
}

function createDateElement(inputName) {
  const inputContainer = document.createElement("div")
  const label = document.createElement("label")
  label.setAttribute("for", inputName)
  label.textContent = inputName
  const input = document.createElement("input")
  input.setAttribute("type", "date")
  input.setAttribute("name", inputName)
  input.setAttribute("value", format(new Date(), "yyyy-MM-dd"))
  inputContainer.append(label, input)
  return inputContainer
}

function createPriorityElement(prioritySymbols) {
  const fieldset = document.createElement("fieldset")
  const legend = document.createElement("legend")
  legend.textContent = "Select a Priority:"
  fieldset.append(legend)

  const priorityLevels = prioritySymbols.map((symbol) => symbol.description)
  priorityLevels.forEach((priority, index) => {
    const container = document.createElement("div")
    const label = document.createElement("label")
    label.setAttribute("for", priority)
    label.setAttribute("id", priority)
    label.textContent = priority
    const radio = document.createElement("input")
    radio.setAttribute("type", "radio")
    radio.setAttribute("name", "Priority")
    radio.setAttribute("value", priority)
    radio.setAttribute("id", priority)
    if (index === 0) {
      radio.setAttribute("checked", "")
    }
    container.append(radio, label)
    fieldset.append(container)
  })
  return fieldset
}

function createNotesElement() {
  const container = document.createElement("div")
  const label = document.createElement("label")
  label.setAttribute("for", "Note")
  label.textContent = "Note: "
  const textarea = document.createElement("textarea")
  textarea.setAttribute("name", "Note")
  textarea.setAttribute("rows", "5")
  container.append(label, textarea)
  return container
}

function setRequiredInput(...inputs) {
  inputs.forEach((input) => input.setAttribute("required", ""))
}