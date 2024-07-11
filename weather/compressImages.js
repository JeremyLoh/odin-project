const sharp = require("sharp")

const images = [
  {
    imagePath: "./images/original/chuttersnap-small.jpg",
    outputFilename: "chuttersnap-small",
    width: 640,
    height: 479,
  },
  {
    imagePath: "./images/original/chuttersnap-medium.jpg",
    outputFilename: "chuttersnap-medium",
    width: 1920,
    height: 1439,
  },
  {
    imagePath: "./images/original/chuttersnap-large.jpg",
    outputFilename: "chuttersnap-large",
    width: 2400,
    height: 1798,
  },
]
const outputPath = "./images"

function resizeJpgToAvif({ imagePath, outputFilename, width, height }) {
  sharp(imagePath)
    .resize(width, height)
    .avif({ quality: 70, effort: 9, lossless: false })
    .toFile(`${outputPath}/${outputFilename}-${width}w.avif`, (error, info) => {
      if (error) {
        console.error(error)
      }
      console.log(info)
    })
}

images.forEach((image) => resizeJpgToAvif(image))
