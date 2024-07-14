/*
Smallest Multiple
https://projecteuler.net/problem=5

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder
What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
(evenly divisble means divisible with no remainder)
*/
function smallestMultiple(max = 20) {
  // Find the lowest common multiple of numbers between 1 and 20
  // Least Common Multiple (LCM) - https://www.youtube.com/watch?v=sae1IoToQ0M
  // get prime factors of each number, multiple by the max count of times factor appear
  const factors = []
  for (let i = 1; i <= max; i++) {
    factors.push(findFactorTree(i))
  }
  // for each prime factor, get the max count
  const maxFactorCounts = {}
  for (let i = 0; i < factors.length; i++) {
    for (const [factor, count] of Object.entries(factors[i])) {
      if (!maxFactorCounts[factor] || maxFactorCounts[factor] < count) {
        maxFactorCounts[factor] = count
      }
    }
  }
  let smallestMultiple = 1
  for (const [factor, count] of Object.entries(maxFactorCounts)) {
    const factorToIntValue = parseInt(factor)
    for (let i = 0; i < count; i++) {
      smallestMultiple *= factorToIntValue
    }
  }
  return smallestMultiple
}

function findFactorTree(n) {
  // get all prime factors of number and their counts
  const factors = {}
  let current = n
  for (let factor = 2; current > 1; factor++) {
    while (current % factor === 0) {
      current /= factor
      factors[factor] = factors[factor] ? factors[factor] + 1 : 1
    }
  }
  return factors
}

console.time("smallestMultiple")
const answer = smallestMultiple()
console.timeEnd("smallestMultiple")
console.log(answer, answer === 232792560)
