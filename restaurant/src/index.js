import "./style.css"
import backgroundImg from "./assets/images/background.jpeg"
import { getHomeSetupElement } from "./pages/home"
import { getMenuSetupElement } from "./pages/menu"

function setup() {
  setupNavigation()

  const contentContainer = document.querySelector("#content")
  contentContainer.style.backgroundImage = `url(${backgroundImg})`
  contentContainer.style.backgroundSize = "contain"
  const home = getHomeSetupElement()

  contentContainer.append(home)
}

function setupNavigation() {
  const navButtons = document.querySelectorAll("header nav button")
  console.log(navButtons)
  console.log(navButtons[1].textContent)
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
      // TODO
      break
    default:
      break
  }
}

setup()