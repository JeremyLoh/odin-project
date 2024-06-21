import { createCardElement, createCardTitleElement } from "../ui/element"

export function getMenuSetupElement() {
  const container = document.createElement("div")
  container.classList.add("menu-container")
  container.append(
    setupMenu()
  )
  return container
}

function setupMenu() {
  const card = createCardElement()
  const cardTitle = createCardTitleElement("Menu")
  const coffee = document.createElement("p")
  coffee.textContent = "Coffee"
  coffee.classList.add("bold", "text-center")
  const coffeeInfo = {
    "Espresso": "$1.00",
    "Caffe Latte": "$3.00",
    "Americano": "$1.90",
    "Macchiato": "$1.50",
    "Cappuccino": "$3.50",
  }
  const coffeeInfoContainer = document.createElement("div")
  for (const [coffee, price] of Object.entries(coffeeInfo)) {
    const container = createMenuElement(coffee, price)
    container.classList.add("menu-coffee-info")
    coffeeInfoContainer.append(container)
  }

  const others = document.createElement("p")
  others.textContent = "Others"
  others.classList.add("bold", "text-center")
  const othersInfo = {
    "Hojicha Latte": "$4.00",
    "Matcha Latte": "$4.00",
    "Lemonade": "$1.50",
  }
  const othersInfoContainer = document.createElement("div")
  for (const [other, price] of Object.entries(othersInfo)) {
    const container = createMenuElement(other, price)
    container.classList.add("menu-coffee-info")
    othersInfoContainer.append(container)
  }
  card.append(cardTitle, coffee, coffeeInfoContainer, others, othersInfoContainer)
  return card
}

function createMenuElement(name, price) {
  const container = document.createElement("div")
  const itemName = document.createElement("p")
  itemName.textContent = name
  const itemPrice = document.createElement("p")
  itemPrice.textContent = price
  container.append(itemName, itemPrice)
  return container
}