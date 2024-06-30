import { NavView } from "../view/nav-view"
import { ProjectController } from "./project-controller"

export const NavController = (function() {
  function handleRenderAllProjects() {
    ProjectController.renderAllProjects()
  }
  function setupButtons() {
    NavView.setupCreateProjectButton()
    NavView.setupViewProjectsButton(handleRenderAllProjects)
  }
  return { setupButtons }
})()