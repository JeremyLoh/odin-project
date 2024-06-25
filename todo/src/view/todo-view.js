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

  const titleElement = document.createElement("h4")
  titleElement.textContent = todo.title
  titleElement.classList.add("todo-title")

  // TODO format the due date
  const dueDateElement = document.createElement("p")
  dueDateElement.textContent = `Due Date: ${todo.dueDate}`
  dueDateElement.classList.add("todo-due-date")

  const priorityElement = document.createElement("p")
  priorityElement.textContent = `${todo.priority} priority`
  priorityElement.classList.add("todo-priority")

  const descriptionElement = document.createElement("p")
  descriptionElement.textContent = todo.description.length === 0
    ? `Description: Not Available`
    : `Description: ${todo.description}`
  descriptionElement.classList.add("todo-description")
  descriptionElement.classList.add("collapsed")

  // TODO make notes textarea view only and style it 
  const notesElement = document.createElement("textarea")
  notesElement.textContent = `Notes: ${todo.notes}`
  notesElement.classList.add("todo-notes")
  notesElement.classList.add("collapsed")

  const expandElement = document.createElement("button")
  expandElement.textContent = "Expand"
  expandElement.classList.add("expand-button")
  expandElement.addEventListener("click", (event) => {
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
  })
  card.append(titleElement, dueDateElement, priorityElement, descriptionElement, notesElement, expandElement)
  return card
}

function getCollapsableElements(card) {
  return [
    card.querySelector(".todo-description"),
    card.querySelector(".todo-notes"),
  ]
}