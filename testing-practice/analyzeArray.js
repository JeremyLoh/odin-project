export default function analyzeArray(array) {
  if (array == null) {
    return {}
  }
  let total = 0
  let min = array[0] || 0
  let max = array[0] || 0
  const length = array.length
  for (let i = 0; i < length; i++) {
    const current = array[i]
    total += current
    min = current < min ? current : min
    max = current > max ? current : max
  }
  const average = length > 0 ? total / length : 0
  return {
    average,
    min,
    max,
    length,
  }
}
