/* 
Largest Prime Factor
https://projecteuler.net/problem=3

The prime factors of 13195 are 5, 7, 13 and 29
What is the largest prime factor of the number 600851475143
*/
// https://stackoverflow.com/questions/70195234/project-euler-problem-3-how-to-make-my-sieve-of-eratosthenes-implementation-w
function largestPrimeFactor(n) {
  // largest possible prime factor is <= sqrt(n)
  // if r * r == n, then anything larger than r will not be a possible prime factor
  const factors = getFactors(n)
  const primeFactors = factors.filter(isPrime)
  return primeFactors.pop()
}

function getFactors(n) {
  const factors = []
  let current = n
  for (let i = 2; i < Math.sqrt(current); i++) {
    if (current % i === 0) {
      factors.push(i)
      current /= i // reduce n by divisible factor
    }
  }
  factors.push(current)
  return factors
}

function isPrime(n) {
  // prime factor is only divisible by 1 and itself
  const factors = []
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      factors.push(i)
    }
  }
  return factors.length === 1 && factors[0] === n
}

// Cannot be used, once the input number n is very large
function sieveOfEratosthenes(n) {
  // Generate a list from 2 to n
  // for each number, remove all the multiples of that number in the list
  // https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
  let primeNumbers = []
  for (let i = 2; i < n; i++) {
    primeNumbers.push(i)
  }
  // we can stop getting new sieve at sqrt(n)
  let sieveIndex = 0
  let sieve = primeNumbers[sieveIndex]
  while (sieve <= Math.sqrt(n)) {
    let multiple = 2
    while (multiple * sieve < n) {
      primeNumbers = primeNumbers.filter((value) => value !== multiple * sieve)
      multiple++
    }
    sieveIndex++
    sieve = primeNumbers[sieveIndex]
  }
  return primeNumbers
}

// The prime factors of 13195 are 5, 7, 13 and 29
console.time("largestPrimeFactor of 13195")
console.log(largestPrimeFactor(13195)) // should be 29
console.timeEnd("largestPrimeFactor of 13195")

console.time("largestPrimeFactor of 600851475143")
console.log(largestPrimeFactor(600851475143)) // should be 6857
console.timeEnd("largestPrimeFactor of 600851475143")
