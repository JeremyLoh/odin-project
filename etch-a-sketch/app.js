function generateGrid(rows, columns) {
  const container = document.querySelector("#container")
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const square = createSquare(columns)
      square.addEventListener("mouseover", () => square.classList.toggle("square-hover"))
      square.addEventListener("mouseout", () => setTimeout(() => square.classList.toggle("square-hover"), 400))
      container.appendChild(square)
    }
  }
  fixGridBorderStyle(columns)
}

function createSquare(size) {
  const square = document.createElement("div")
  square.classList.add("square")
  square.style["flex"] = "1"
  square.style["flex-shrink"] = "0"
  square.style["flex-basis"] = `calc(100%/${size})`
  return square
}

function fixGridBorderStyle(columns) {
  // https://stackoverflow.com/questions/46811502/prevent-double-borders-around-side-by-side-elements
  // Remove top border for each row after first row (duplicate 1mm top border)
  const elements = document.querySelectorAll(`.square:nth-child(n + ${columns + 1}`)
  elements.forEach((e) => e.style["border-top"] = "none")
  // Add missing right border on last column, of each row
  const lastColumnElements = document.querySelectorAll(`.square:nth-child(${columns}n)`)
  lastColumnElements.forEach((e) => e.style["border-right"] = "1mm solid black")
}

function setupEditGridButton() {
  const gridButton = document.querySelector("#edit-grid-btn")
  gridButton.addEventListener("click", setupGrid)
}

function setupGrid() {
  while (true) {
    const size = Number.parseInt(prompt("Enter the number of squares per side for the new grid"))
    if (Number.isInteger(size) && size > 0 && size <= 100) {
      const container = document.querySelector("#container")
      container.replaceChildren()
      generateGrid(size, size)
      break
    }
    alert("Please enter a valid number for the new grid size (Between 1 and 100)")
  }
}

generateGrid(16, 16)
setupEditGridButton()