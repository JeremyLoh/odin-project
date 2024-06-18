import { createCardElement, createCardTitleElement, createListElement } from "../ui/element"

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
  const coffeeList = createListElement(["Espresso", "Caffe Latte", "Americano", "Macchiato", "Cappuccino"])
  
  const others = document.createElement("p")
  others.textContent = "Others"
  others.classList.add("bold", "text-center")
  const othersList = createListElement(["Hojicha Latte", "Matcha Latte", "Lemonade"])
  card.append(cardTitle, coffee, coffeeList, others, othersList)
  return card
}