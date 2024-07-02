function setupDropdown(name, dropdownItems) {
  const dropdownButton = document.querySelector(".dropdown-toggle")
  dropdownButton.textContent = name

  dropdownButton.addEventListener("click", () => {
    const menu = document.querySelector(".dropdown-menu")
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden")
    } else {
      menu.classList.add("hidden")
    }
  })

  const dropdownMenu = document.querySelector(".dropdown-menu")
  dropdownItems.forEach((item) => {
    const div = document.createElement("div")
    div.classList.add("dropdown-item")
    div.textContent = item
    dropdownMenu.append(div)
  })
}

setupDropdown("Test Dropdown", ["New Option", "What other option"])
