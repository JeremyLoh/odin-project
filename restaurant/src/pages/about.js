import { createCardElement, createCardTitleElement } from "../ui/element"
import coffeeCupImg from "../assets/images/coffee-cup.png"


export function getAboutSetupElement() {
  const container = document.createElement("div")
  container.classList.add("about-container")
  container.append(
    setupCoffeeImageHeader(),
    setupRestaurantSummary(),
    setupContactForm()
  )
  return container
}

function setupCoffeeImageHeader() {
  const card = createCardElement()
  const coffeeContainer = document.createElement("div")
  coffeeContainer.style.backgroundImage = `url(${coffeeCupImg})`
  coffeeContainer.style.backgroundRepeat = "repeat-x"
  coffeeContainer.style.backgroundSize = "contain"
  coffeeContainer.style.height = "100px"
  card.append(coffeeContainer)
  return card
}

function setupRestaurantSummary() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Origins")
  const description = document.createElement("p")
  description.textContent = "Jeremy's Coffee House started as a simple idea: " + 
    "to serve amazing coffee, at affordable prices!"
  card.append(cardTitle, description)
  return card
}

function setupContactForm() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Contact Us")

  const form = document.createElement("form")
  form.classList.add("contact-form")
  form.setAttribute("method", "post")
  form.setAttribute("action", "https://httpbin.org/post")
  const nameLabel = document.createElement("label")
  nameLabel.setAttribute("for", "name")
  nameLabel.textContent = "Name: "
  const nameInput = document.createElement("input")
  nameInput.setAttribute("type", "text")
  nameInput.setAttribute("name", "name")
  nameInput.setAttribute("required", "")
  const messageLabel = document.createElement("label")
  messageLabel.setAttribute("for", "message")
  messageLabel.textContent = "Message: "
  const messageTextArea = document.createElement("textarea")
  messageTextArea.setAttribute("rows", "8")
  messageTextArea.setAttribute("required", "")
  messageTextArea.setAttribute("placeholder", "Request will be submitted to https://httpbin.org/post")
  const submitBtn = document.createElement("button")
  submitBtn.textContent = "Submit"
  submitBtn.setAttribute("type", "submit")

  form.append(nameLabel, nameInput, messageLabel, messageTextArea, submitBtn)
  card.append(cardTitle, form)
  return card
}