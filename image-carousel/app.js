let advanceCarouselIntervalId = null

const images = [
  {
    srcset: getSrcset("./images", "zhaoli-jin-e4I2ktXz5cA-unsplash", "avif"),
    src: "./images/zhaoli-jin-e4I2ktXz5cA-unsplash-1500w.avif",
  },
  {
    srcset: getSrcset(
      "./images",
      "evgeny-lazarenko-8HknSpvc1CU-unsplash",
      "avif"
    ),
    src: "./images/evgeny-lazarenko-8HknSpvc1CU-unsplash-1500w.avif",
  },
  {
    srcset: getSrcset("./images", "joseph-corl-h4eHV9CRxUc-unsplash", "avif"),
    src: "./images/joseph-corl-h4eHV9CRxUc-unsplash-1500w.avif",
  },
  {
    srcset: getSrcset("./images", "liana-s-VT2Ygvzn49Y-unsplash", "avif"),
    src: "./images/liana-s-VT2Ygvzn49Y-unsplash-1500w.avif",
  },
  {
    srcset: getSrcset("./images", "yu-kato-824OwkP7sgk-unsplash", "avif"),
    src: "./images/yu-kato-824OwkP7sgk-unsplash-1500w.avif",
  },
]

function getSrcset(imageDirectory, imageName, imageExtension) {
  return `${imageDirectory}/${imageName}-600w.${imageExtension} 600w, ${imageDirectory}/${imageName}-1500w.${imageExtension} 1500w`
}

function loadImage(index) {
  if (index < 0 || index >= images.length) {
    return
  }
  const imageContainer = document.querySelector("#image")
  const img = document.querySelector("#image img")
  const { srcset, src } = images[index]
  img.src = src
  img.srcset = srcset
  img.width = "1500"
  img.height = "1000"
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

  clearInterval(advanceCarouselIntervalId)
  advanceCarouselIntervalId = setupCarouselSlideAdvance()
}

function setupCarouselSlideAdvance(durationInMs = 5000) {
  const intervalId = setInterval(next, durationInMs)
  return intervalId
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
  advanceCarouselIntervalId = setupCarouselSlideAdvance()
}

setup()
