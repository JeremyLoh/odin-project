export function renderTodos(todos) {
  const main = document.querySelector("main")
  const container = document.createElement("div")
  container.classList.add("todo-container")
  todos.forEach((todo) => container.append(createTodoElement(todo)))
  main.append(container)
}

function createTodoElement(todo) {
  const card = document.createElement("div")
  card.classList.add("todo-card")

  // TODO create todo element card

  // const titleElement = document.createElement("h4")
  // titleElement.textContent = todo.title

  // const dueDateElement = document.createElement("p")
  // dueDateElement.textContent = todo.dueDate

  // card.append(titleElement, dueDateElement)
  return card
}