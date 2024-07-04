const sharp = require("sharp")

const images = [
  "./images/original/zhaoli-jin-e4I2ktXz5cA-unsplash.jpg",
  "./images/original/evgeny-lazarenko-8HknSpvc1CU-unsplash.jpg",
  "./images/original/joseph-corl-h4eHV9CRxUc-unsplash.jpg",
  "./images/original/liana-s-VT2Ygvzn49Y-unsplash.jpg",
  "./images/original/yu-kato-824OwkP7sgk-unsplash.jpg",
]
const outputFileNames = [
  "zhaoli-jin-e4I2ktXz5cA-unsplash",
  "evgeny-lazarenko-8HknSpvc1CU-unsplash",
  "joseph-corl-h4eHV9CRxUc-unsplash",
  "liana-s-VT2Ygvzn49Y-unsplash",
  "yu-kato-824OwkP7sgk-unsplash",
]
const outputPath = "./images"

images.forEach((image, index) => {
  sharp(image)
    .resize(1500, 1000)
    .avif({ quality: 70, effort: 9, lossless: false })
    .toFile(`${outputPath}/${outputFileNames[index]}.avif`, (error, info) => {
      if (error) {
        console.error(error)
      }
      console.error(info)
    })
})
