/* 
Problem ID 1 - https://projecteuler.net/problem=1
https://projecteuler.net/archives
If we list all the natural numbers below 10 that are multiple of 3 or 5,
we get 3, 5, 6 and 9
The sum of these multiples is 23
Find the sum of all the multiple of 3 or 5 below 1000
*/
function sumMultiple(n) {
  // remove the double counting of multiple of (3 * 5) = 15
  return sumMultipleOf(n, 3) + sumMultipleOf(n, 5) - sumMultipleOf(n, 3 * 5)
}

function sumMultipleOf(n, multiple, total = 0) {
  if (n <= 0) {
    return total
  }
  if (n % multiple === 0) {
    return sumMultipleOf(n - 1, multiple, total + n)
  } else {
    return sumMultipleOf(n - 1, multiple, total)
  }
}
// Time complexity: O(N)
console.time("slowerSumMultiple")
const slowerSumMultiple = sumMultiple(999)
console.timeEnd("slowerSumMultiple")
console.log(`=> Slower sum multiple: ${slowerSumMultiple}`)

// -------------------------------------------------------
function fasterSumMultiple(n) {
  // https://www.emilygorcenski.com/post/solving-project-euler-problem-1/
  // multiple of 3: 3 + 6 + 9 + ... + 999 = 3(1 + 3 + 6 + ... + 333)
  // ^ we need to find the number "333"
  // sum of 1 to n = n(n + 1)/2
  const multipleOfThree = 3 * sumOneToN(Math.floor(n / 3))
  const multipleOfFive = 5 * sumOneToN(Math.floor(n / 5))
  // remove duplicate count of 3 * 5 factors
  const multipleOfFifteen = 15 * sumOneToN(Math.floor(n / 15))
  return multipleOfThree + multipleOfFive - multipleOfFifteen
}
function sumOneToN(n) {
  return (n * (n + 1)) / 2
}
// Time Complexity: O(1)
console.time("fasterSumMultiple")
const faster = fasterSumMultiple(999)
console.timeEnd("fasterSumMultiple")
console.log(`=> Faster Sum Multiple: ${faster}`)
