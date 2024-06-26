import { displayCreateProjectForm } from "./project-form"

export const NavView = (function() {
  function setupCreateProjectButton() {
    const createProjectButton = document.querySelector(".create-project-btn")
    createProjectButton.addEventListener("click", () => {
      displayCreateProjectForm()
    })
  }
  return { setupCreateProjectButton }
})()