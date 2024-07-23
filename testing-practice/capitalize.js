export default function capitalize(text) {
  if (text == null) {
    return ""
  }
  const size = text.length
  let output = ""
  const nonCharRegex = /[\d\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/
  for (let i = 0; i < size; i++) {
    const char = text.charAt(i)
    if (nonCharRegex.test(char)) {
      output += char
    } else {
      output += char.toUpperCase() + text.slice(i + 1)
      break
    }
  }
  return output
}
