// using iteration write function "fibs" that takes a number
// and returns an array containing that many numbers from fibonacci sequence
// e.g input = 8, returns [0, 1, 1, 2, 3, 5, 8, 13]
function fibs(n) {
  let output = []
  let first = 0
  let second = 1
  for (let i = 0; i < n; i++) {
    if (i <= 1) {
      output.push(i)
      continue
    }
    output.push(first + second)
    const next = first + second
    first = second
    second = next
  }
  return output
}
// console.log(fibs(1))
// console.log(fibs(2))
// console.log(fibs(3))
// console.log(fibs(4))
// console.log(fibs(5))
// console.log(fibs(6))
// console.log(fibs(7))
// console.log(fibs(8))
// console.log(fibs(99))

// write function "fibsRec" that solves the same problem recursively
function fibsRec(n) {
  if (n <= 0) {
    return []
  }
  if (n === 1) {
    return [0]
  }
  if (n === 2) {
    return [0, 1]
  }
  // assumption, calculate fibsRec(n - 1), array will be returned
  const previous = fibsRec(n - 1)
  // take last two numbers and calculate fib(n) number
  // n is not calculated yet, last two numbers are on index n - 3 and n - 2
  const first = previous[n - 3]
  const second = previous[n - 2]
  return [...previous, first + second]
}
// console.log(fibsRec(1))
// console.log(fibsRec(2))
// console.log(fibsRec(3))
// console.log(fibsRec(4))
// console.log(fibsRec(5))
// console.log(fibsRec(6))
// console.log(fibsRec(7))
// console.log(fibsRec(8))
