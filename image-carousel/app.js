const images = [
  "./images/zhaoli-jin-e4I2ktXz5cA-unsplash.jpg",
  "./images/evgeny-lazarenko-8HknSpvc1CU-unsplash.jpg",
  "./images/joseph-corl-h4eHV9CRxUc-unsplash.jpg",
  "./images/liana-s-VT2Ygvzn49Y-unsplash.jpg",
  "./images/yu-kato-824OwkP7sgk-unsplash.jpg",
]

function loadImage(index) {
  if (index < 0 || index >= images.length) {
    return
  }
  const imageContainer = document.querySelector("#image")
  const img = document.querySelector("#image img")
  img.src = images[index]
  img.setAttribute("data-index", index)
  img.setAttribute("active", "")
  imageContainer.append(img)
}

function next() {
  const currentIndex = parseInt(
    document.querySelector("#image img").getAttribute("data-index")
  )
  const nextIndex = (currentIndex + 1) % images.length
  loadImage(nextIndex)
  setNavigationCircle(currentIndex, nextIndex)
}

function previous() {
  const currentIndex = parseInt(
    document.querySelector("#image img").getAttribute("data-index")
  )
  const imageCount = images.length
  // https://stackoverflow.com/questions/14785443/is-there-an-expression-using-modulo-to-do-backwards-wrap-around-reverse-overfl
  const previousIndex = (currentIndex - 1 + imageCount) % imageCount
  loadImage(previousIndex)
  setNavigationCircle(currentIndex, previousIndex)
}

function setNavigationCircle(currentActiveIndex, nextActiveIndex) {
  // nth-child index starts from one
  const currentActiveCircle = document.querySelector(
    `#navigation-circles .circle:nth-child(${currentActiveIndex + 1})`
  )
  const nextActiveCircle = document.querySelector(
    `#navigation-circles .circle:nth-child(${nextActiveIndex + 1})`
  )
  currentActiveCircle.classList.remove("active")
  nextActiveCircle.classList.add("active")
}

function handleNavigationCircleClick(event) {
  event.stopPropagation()
  // handle circle click to go to that image
  const circle = event.target
  const index = parseInt(circle.getAttribute("data-index"))
  const currentActiveCircle = document.querySelector(
    "#navigation-circles .circle.active"
  )
  const currentActiveIndex = parseInt(
    currentActiveCircle.getAttribute("data-index")
  )
  loadImage(index)
  setNavigationCircle(currentActiveIndex, index)
}

function setup() {
  const leftArrow = document.querySelector("#left-carousel-arrow")
  const rightArrow = document.querySelector("#right-carousel-arrow")
  const navigationCircles = [
    ...document.querySelectorAll("#navigation-circles .circle"),
  ]

  leftArrow.addEventListener("click", previous)
  rightArrow.addEventListener("click", next)
  navigationCircles.forEach((circleElement) =>
    circleElement.addEventListener("click", handleNavigationCircleClick)
  )
  loadImage(0)
  setNavigationCircle(0, 0)
}

setup()
