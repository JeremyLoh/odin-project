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

function resizeJpgToAvif(image, { outputFilename, width, height }) {
  sharp(image)
    .resize(width, height)
    .avif({ quality: 70, effort: 9, lossless: false })
    .toFile(`${outputPath}/${outputFilename}-${width}w.avif`, (error, info) => {
      if (error) {
        console.error(error)
      }
      console.error(info)
    })
}

images.forEach((image, index) => {
  resizeJpgToAvif(image, {
    outputFilename: outputFileNames[index],
    width: 1500,
    height: 1000,
  })
  resizeJpgToAvif(image, {
    outputFilename: outputFileNames[index],
    width: 600,
    height: 400,
  })
})
