/*
Sum Square Difference
https://projecteuler.net/problem=6

The sum of the squares of the first ten natural numbers is
1^2 + 2^2 + ... + 10^2 = 385
The square of the sum of the first ten natural numbers is
(1 + 2 + ... + 10)^2 = 55^2 = 3025

Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is
3025 - 385 = 2640

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum
*/
function sumSquareDifference(n) {
  let sumOfSquares = 0
  let sumOfNumbers = 0
  for (let i = 1; i <= n; i++) {
    sumOfSquares += i ** 2
    sumOfNumbers += i
  }
  return sumOfNumbers ** 2 - sumOfSquares
}

console.time("sumSquareDifference of 100")
const answer = sumSquareDifference(100)
console.timeEnd("sumSquareDifference of 100")
console.log(answer)
