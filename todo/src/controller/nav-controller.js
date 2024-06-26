import { NavView } from "../view/nav-view"

export const NavController = (function() {
  function setupButtons() {
    NavView.setupCreateProjectButton()
  }
  return { setupButtons }
})()