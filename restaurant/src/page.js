import HeroImg from "./assets/images/hero.jpeg"
import BackgroundImg from "./assets/images/background.jpeg"

export function setup(contentContainer) {
  contentContainer.append(setupHero())
}

function setupHero() {
  const container = document.createElement("div")
  container.id = "hero"
  container.style.backgroundImage = `url(${BackgroundImg})`
  container.style.backgroundSize = "contain"
  const header = document.createElement("h1")
  header.textContent = "Jeremy's Coffee House"
  const h2 = document.createElement("h2")
  h2.textContent = "Look at what you made me brew!"
  const heroImg = new Image(500, 500)
  heroImg.src = HeroImg
  heroImg.classList.add("hero-img")
  container.append(header, h2, heroImg)
  return container
}