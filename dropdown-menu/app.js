const Variant = Object.freeze({
  SUCCESS: "success",
  DANGER: "danger",
  WARNING: "warning",
})

function getButtonVariantClass(variant) {
  let className = ""
  switch (variant) {
    case Variant.SUCCESS:
      className = Variant.SUCCESS
      break
    case Variant.DANGER:
      className = Variant.DANGER
      break
    case Variant.WARNING:
      className = Variant.WARNING
      break
  }
  return className
}

function createDropdownVariant(name, variant, items) {
  const body = document.querySelector("body")

  const dropdown = document.createElement("div")
  dropdown.classList.add("dropdown")

  const dropdownButton = document.createElement("button")
  dropdownButton.classList.add("dropdown-toggle")
  dropdownButton.textContent = name
  dropdownButton.classList.add(getButtonVariantClass(variant))

  const dropdownMenu = document.createElement("div")
  dropdownMenu.classList.add("dropdown-menu")
  dropdownMenu.classList.add("hidden")
  items.forEach((item) => {
    const div = document.createElement("div")
    div.classList.add("dropdown-item")
    div.textContent = item
    dropdownMenu.append(div)
  })

  dropdownButton.addEventListener("click", () => {
    const menu = dropdownMenu
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden")
    } else {
      menu.classList.add("hidden")
    }
  })
  dropdown.append(dropdownButton, dropdownMenu)
  body.append(dropdown)
}

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

createDropdownVariant("Danger", Variant.DANGER, [
  "Danger one",
  "danger two",
  "Danger 3",
])

createDropdownVariant("Warning", Variant.WARNING, [
  "Warning one",
  "warn two",
  "warning 3",
])

createDropdownVariant("Success", Variant.SUCCESS, [
  "success one",
  "success two",
  "success 3",
])
