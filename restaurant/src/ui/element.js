export function createCardElement() {
  const card = document.createElement("div")
  card.classList.add("card")
  return card
}

export function createCardTitleElement(text) {
  const cardTitle = document.createElement("p")
  cardTitle.classList.add("card-title")
  cardTitle.textContent = text
  return cardTitle
}

export function createListElement(items) {
  const ul = document.createElement("ul")
  const itemElements = items.map(text => {
    const li = document.createElement("li")
    li.append(document.createTextNode(text))
    return li
  })
  ul.append(...itemElements)
  return ul
}