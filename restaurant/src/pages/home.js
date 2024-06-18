import coffeeCupImg from "../assets/images/coffee-cup.png"
import { createCardElement, createCardTitleElement, createListElement } from "../ui/element"

export function getHomeSetupElement() {
  const container = document.createElement("div")
  container.classList.add("home-container")
  container.append(
    setupHero(),
    setupLocation(),
    setupHours(),
    setupTestimonial(),
  )
  return container
}

function setupHero() {
  const container = document.createElement("div")
  container.id = "hero"
  const header = document.createElement("h1")
  header.textContent = "Jeremy's Coffee House"
  const h2 = document.createElement("h2")
  h2.textContent = "Look at what you made me brew!"
  const coffeeCup = new Image(100, 100)
  coffeeCup.src = coffeeCupImg
  coffeeCup.classList.add("coffee-cup-img")
  container.append(header, h2, coffeeCup)
  return container
}

function setupLocation() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Location")
  const location = document.createElement("p")
  location.textContent = "123 Coffee Street, Singapore 123456"
  location.classList.add("text-center")
  card.append(cardTitle, location)
  return card
}

function setupHours() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Hours")
  const ul = createListElement(["Monday to Friday", "7am — 5pm", "Saturday", "8am — 6pm", "Sunday", "8am — 4pm"])
  card.append(cardTitle, ul)
  return card
}

function setupTestimonial() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Testimonial")
  const testimonial = document.createElement("div")
  testimonial.classList.add("testimonial")
  
  const testimonialTitle = document.createElement("p")
  testimonialTitle.classList.add("testimonial-title")
  testimonialTitle.textContent = "Want the best coffee? Get it here!"
  
  const testimonialDescription = document.createElement("p")
  testimonialDescription.classList.add("testimonial-description")
  testimonialDescription.textContent = "Jeremy's Coffee House has been on my radar for a while. " +
    "I was impressed with the quality of coffee I received!"
  
  const testimonialName = document.createElement("p")
  testimonialName.classList.add("testimonial-name")
  testimonialName.textContent = "@abc"
  
  testimonial.append(testimonialTitle, testimonialDescription, testimonialName)
  card.append(cardTitle, testimonial)
  return card
}