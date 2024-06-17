import HeroImg from "./assets/images/hero.jpeg"
import BackgroundImg from "./assets/images/background.jpeg"

export function setup(contentContainer) {
  contentContainer.append(setupHero(),
    setupLocation(),
    setupHours(),
    setupMenu(),
    setupTestimonial(),
  )
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

function setupLocation() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Location")
  const location = document.createElement("p")
  location.textContent = "123 Coffee Street, Singapore 123456"
  card.append(cardTitle, location)
  return card
}

function setupHours() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Hours")
  const ul = createListElement(["Monday to Friday: 7am - 5pm", "Saturday: 8am - 6pm", "Sunday: 8am - 4pm"])
  card.append(cardTitle, ul)
  return card
}

function setupMenu() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Menu")
  const coffee = document.createElement("p")
  coffee.textContent = "Coffee"
  coffee.classList.add("bold")
  const coffeeList = createListElement(["Espresso", "Caffe Latte", "Americano", "Macchiato", "Cappuccino"])
  
  const others = document.createElement("p")
  others.textContent = "Others"
  others.classList.add("bold")
  const othersList = createListElement(["Hojicha Latte", "Matcha Latte", "Lemonade"])
  card.append(cardTitle, coffee, coffeeList, others, othersList)
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

function createCardElement() {
  const card = document.createElement("div")
  card.classList.add("card")
  return card
}

function createCardTitleElement(text) {
  const cardTitle = document.createElement("p")
  cardTitle.classList.add("card-title")
  cardTitle.textContent = text
  return cardTitle
}

function createListElement(items) {
  const ul = document.createElement("ul")
  const itemElements = items.map(text => {
    const li = document.createElement("li")
    li.append(document.createTextNode(text))
    return li
  })
  ul.append(...itemElements)
  return ul
}