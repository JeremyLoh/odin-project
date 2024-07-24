export default function caesarCipher(text, shiftFactor) {
  if (text === "") {
    return ""
  }
  if (text == null) {
    return null
  }
  const size = text.length
  let output = ""
  for (let i = 0; i < size; i++) {
    const currentCode = text.charCodeAt(i)
    const isLowerCaseCode =
      currentCode >= "a".charCodeAt(0) && currentCode <= "z".charCodeAt(0)
    const isUpperCaseCode =
      currentCode >= "A".charCodeAt(0) && currentCode <= "Z".charCodeAt(0)
    if (isLowerCaseCode) {
      // wrap the amount to shift to within 0 to 25 (25 characters from a to z)
      const shift = (currentCode + shiftFactor - "a".charCodeAt(0)) % 26
      const character = String.fromCharCode("a".charCodeAt(0) + shift)
      output += character
    } else if (isUpperCaseCode) {
      // wrap amount to shift to within 0 to 25 (25 characters from A to Z)
      const shift = (currentCode + shiftFactor - "A".charCodeAt(0)) % 26
      const character = String.fromCharCode("A".charCodeAt(0) + shift)
      output += character
    } else {
      output += text.charAt(i)
    }
  }
  return output
}
