/*
Build a function "mergeSort" that takes in an array and
returns a sorted array, using recursive merge sort methodology
e.g. input of [3, 2, 1, 13, 8, 5, 0, 1] should return [0, 1, 1, 2, 3, 5, 8, 13]
e.g. input of [105, 79, 100, 110] should return [79, 100, 105, 110]
*/
function mergeSort(array) {
  // base case when single item or no items
  if (!array || array.length <= 1) {
    return array
  }
  // split array into left and right halves, run merge sort on them
  const mid = Math.floor(array.length / 2)
  const left = mergeSort(array.slice(0, mid))
  const right = mergeSort(array.slice(mid))
  // combine the left and right halves by merging
  return merge(left, right)
}

function merge(left, right) {
  let i = 0
  let j = 0
  const leftSize = left.length
  const rightSize = right.length
  const output = []
  while (i < leftSize && j < rightSize) {
    const leftCurrent = left[i]
    const rightCurrent = right[j]
    if (leftCurrent < rightCurrent) {
      output.push(leftCurrent)
      i++
    } else {
      output.push(rightCurrent)
      j++
    }
  }
  if (i < leftSize) {
    output.push(...left.slice(i))
  }
  if (j < rightSize) {
    output.push(...right.slice(j))
  }
  return output
}
// e.g. input of [3, 2, 1, 13, 8, 5, 0, 1] should return [0, 1, 1, 2, 3, 5, 8, 13]
const x = [3, 2, 1, 13, 8, 5, 0, 1]
console.log(mergeSort(x))
// e.g. input of [105, 79, 100, 110] should return [79, 100, 105, 110]
const y = [105, 79, 100, 110]
console.log(mergeSort(y))
