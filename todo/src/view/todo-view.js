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

  card.addEventListener("click", (event) => {
    // TODO have expand card functionality on click, to render remaining todo details
    // possible design: the card contents are present, with opacity level = 0
    // when the "expand" class is added to the todo card, opacity = 1, and the height should adjust
  })

  const titleElement = document.createElement("h4")
  titleElement.textContent = todo.title

  const dueDateElement = document.createElement("p")
  dueDateElement.textContent = todo.dueDate

  card.append(titleElement, dueDateElement)
  return card
}