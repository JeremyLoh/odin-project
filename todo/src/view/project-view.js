const { formatDistanceToNowStrict, format } = require("date-fns")

export function renderProjects(projects, callbacks) {
  const {handleProjectCardClick, handleDeleteProject} = callbacks
  removeExistingProjectContents()
  const main = document.querySelector("main")
  const grid = document.createElement("div")
  grid.classList.add("project-grid")
  projects.forEach((project) => {
    const card = createProjectCard(project, (event) => {
      handleDeleteProject(project)
      event.stopPropagation()
    })
    card.addEventListener("click", (event) => {
      handleProjectCardClick(project)
      event.stopPropagation()
    })
    grid.append(card)
  })
  main.append(grid)
}

export function renderCurrentProject(project, callbacks) {
  const {handleDeleteProject} = callbacks
  removeExistingProjectContents()
  const main = document.querySelector("main")
  const grid = document.createElement("div")
  grid.classList.add("project-grid")
  const card = createProjectCard(project, () => handleDeleteProject(project))
  grid.append(card)
  main.append(grid)
}

function removeExistingProjectContents() {
  const isProjectGridDisplayed = document.querySelector(".project-grid") != null
  if (isProjectGridDisplayed) {
    document.querySelector(".project-grid").remove()
  }
  const isTodoContainerDisplayed = document.querySelector(".todo-container") != null
  if (isTodoContainerDisplayed) {
    document.querySelector(".todo-container").remove()
  }
}

function createProjectCard(project, handleDeleteProject) {
  const card = document.createElement("div")
  card.classList.add("project-card")
  card.setAttribute("data-cy", project.title)

  const titleElement = document.createElement("h3")
  titleElement.textContent = project.title

  const totalTodosElement = document.createElement("p")
  totalTodosElement.textContent = project.totalTodos > 1 
    ? `${project.totalTodos} todos`
    : `${project.totalTodos} todo`

  const createdAtElement = document.createElement("p")
  createdAtElement.textContent = `${format(project.createdAt, "d MMMM yyyy")}, ${formatDistanceToNowStrict(project.createdAt)} ago`

  const deleteElement = document.createElement("button")
  deleteElement.classList.add("delete-project-button")
  deleteElement.textContent = "Delete"
  deleteElement.addEventListener("click", handleDeleteProject)

  card.append(titleElement, totalTodosElement, createdAtElement, deleteElement)
  return card
}