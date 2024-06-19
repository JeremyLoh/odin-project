import "./style.css"
import backgroundImg from "./assets/images/background.jpeg"
import { getHomeSetupElement } from "./pages/home"
import { getMenuSetupElement } from "./pages/menu"
import { getAboutSetupElement } from "./pages/about"

function setup() {
  setupNavigation()

  const contentContainer = document.querySelector("#content")
  contentContainer.style.backgroundImage = `url(${backgroundImg})`
  contentContainer.style.backgroundSize = "60%"
  const home = getHomeSetupElement()

  contentContainer.append(home)
}

function setupNavigation() {
  const navButtons = document.querySelectorAll("header nav button")
  navButtons.forEach((element) => {
    element.addEventListener("click", () => {
      clearTabContent()
      addTabContent(element.textContent)
    })
  })
}

function clearTabContent() {
  document.querySelector("#content").textContent = null
}

function addTabContent(tabName) {
  const contentContainer = document.querySelector("#content")
  switch (tabName.toLowerCase()) {
    case "home":
      contentContainer.append(getHomeSetupElement())
      break
    case "menu":
      contentContainer.append(getMenuSetupElement())
      break
    case "about":
      contentContainer.append(getAboutSetupElement())
      break
    default:
      break
  }
}

setup()