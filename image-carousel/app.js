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
  imageContainer.innerHTML = ""
  const img = document.createElement("img")
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
}

function previous() {
  const currentIndex = parseInt(
    document.querySelector("#image img").getAttribute("data-index")
  )
  const imageCount = images.length
  // https://stackoverflow.com/questions/14785443/is-there-an-expression-using-modulo-to-do-backwards-wrap-around-reverse-overfl
  const previousIndex = (currentIndex - 1 + imageCount) % imageCount
  loadImage(previousIndex)
}

function setup() {
  const leftArrow = document.querySelector("#left-carousel-arrow")
  const rightArrow = document.querySelector("#right-carousel-arrow")

  leftArrow.addEventListener("click", previous)
  rightArrow.addEventListener("click", next)
  // TODO setup the navigation dots click, using data attribute
  loadImage(0)
}

setup()
