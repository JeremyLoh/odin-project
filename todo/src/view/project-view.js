const { formatDistanceToNowStrict, format } = require("date-fns")

export function renderProjects(projects) {
  const main = document.querySelector("main")
  const grid = document.createElement("div")
  grid.classList.add("project-grid")
  projects.forEach((project) => grid.append(createProjectCard(project)))
  main.append(grid)
}

function createProjectCard(project) {
  const card = document.createElement("div")
  card.classList.add("project-card")

  const titleElement = document.createElement("h3")
  titleElement.textContent = project.title

  const totalTodosElement = document.createElement("p")
  totalTodosElement.textContent = `${project.totalTodos} todos`

  const createdAtElement = document.createElement("p")
  createdAtElement.textContent = `${format(project.createdAt, "d MMMM yyyy")}, ${formatDistanceToNowStrict(project.createdAt)} ago`

  card.append(titleElement, totalTodosElement, createdAtElement)
  return card
}