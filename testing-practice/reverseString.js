export default function reverseString(value) {
  if (value == null) {
    return ""
  }
  const size = value.length
  let output = ""
  for (let i = size - 1; i >= 0; i--) {
    output += value.charAt(i)
  }
  return output
}
