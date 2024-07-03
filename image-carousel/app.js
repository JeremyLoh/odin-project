const images = [
  "./images/joseph-corl-h4eHV9CRxUc-unsplash.jpg",
  "./images/liana-s-VT2Ygvzn49Y-unsplash.jpg",
]

function loadImage(index) {
  if (index < 0 || index >= images.length) {
    return
  }
  const imageContainer = document.querySelector("#image")
  imageContainer.innerHTML = ""
  const img = document.createElement("img")
  img.src = images[index]
  imageContainer.append(img)
}

function next() {
  // TODO
  console.log("next...")
}

function previous() {
  // TODO
  console.log("previous...")
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