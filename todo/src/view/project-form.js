import { createDialog } from "./dialog"

export function displayCreateProjectForm() {
  const dialog = createDialog()
  const main = document.querySelector("main")
  main.append(dialog)

  const form = document.createElement("form")
  form.classList.add("create-project-form")
  form.setAttribute("data-cy", "create-project-form")
  const formTitleElement = document.createElement("h2")
  formTitleElement.textContent = "Create New Project"
  const nameContainer = createInputElement("Name")
  const submitButton = createSubmitButton()

  // TODO add form event listener for submit, destroy dialog
  form.append(formTitleElement, nameContainer, submitButton)
  dialog.append(form)
  dialog.showModal()
}

function createInputElement(inputName) {
  const inputContainer = document.createElement("div")
  const label = document.createElement("label")
  label.setAttribute("for", inputName)
  label.textContent = inputName
  const input = document.createElement("input")
  input.setAttribute("type", "text")
  input.setAttribute("id", inputName)
  input.setAttribute("name", inputName)
  input.setAttribute("autocomplete", "off")
  inputContainer.append(label, input)
  return inputContainer
}

function createSubmitButton() {
  const submitButton = document.createElement("button")
  submitButton.setAttribute("type", "submit")
  submitButton.textContent = "Create New Project"
  return submitButton
}