import { displayCreateProjectForm } from "./project-form"

export const NavView = (function() {
  function setupCreateProjectButton() {
    const createProjectButton = document.querySelector(".create-project-btn")
    createProjectButton.addEventListener("click", () => {
      displayCreateProjectForm()
    })
  }
  function setupViewProjectsButton(handleRenderAllProjects) {
    const viewProjectsButton = document.querySelector(".view-projects-btn")
    viewProjectsButton.addEventListener("click", () => {
      removeTodoContainer()
      handleRenderAllProjects()
    })
  }
  function removeTodoContainer() {
    const todoContainer = document.querySelector(".todo-container")
    if (todoContainer) {
      todoContainer.remove()
    }
  }
  return { setupCreateProjectButton, setupViewProjectsButton }
})()