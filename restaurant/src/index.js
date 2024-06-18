import "./style.css"
import backgroundImg from "./assets/images/background.jpeg"
import { getHomeSetupElement } from "./pages/home"

const contentContainer = document.querySelector("#content")
contentContainer.style.backgroundImage = `url(${backgroundImg})`
contentContainer.style.backgroundSize = "contain"

const home = getHomeSetupElement()
contentContainer.append(home)