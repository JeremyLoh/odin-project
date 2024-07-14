/*
10001st Prime
https://projecteuler.net/problem=7

By listing the first six prime numbers: 2,3,5,7,11 and 13, we can see that the 6th prime is 13
What is the 10001st prime number?
*/
function findPrime(n) {
  let current = 2
  for (let i = 1; i < n; i++) {
    current++
    while (!isPrime(current)) {
      current++
    }
  }
  return current
}

function isPrime(n) {
  // prime number has only two factors, one and itself
  // we can just search until sqrt(n) for if there are any factors
  // if n = r * r, anything more than r will never be a factor
  const factors = []
  for (let factor = 2; factor <= Math.sqrt(n); factor++) {
    if (n % factor === 0) {
      factors.push(factor)
    }
  }
  return factors.length === 0
}

console.time("findPrime 10001")
const answer = findPrime(10001)
console.timeEnd("findPrime 10001")
console.log(answer) // answer is 104743
