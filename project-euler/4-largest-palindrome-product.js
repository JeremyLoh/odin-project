/*
Largest Palindrome Product
https://projecteuler.net/problem=4

A palindromic number reads the same both ways
The largest palindrome made from the product of two 2-digit numbers
is 9009 = 91 x 99

Find the largest palindrome made from the product of two 3-digit numbers
*/
function largestPalindromeProduct(max = 999, min = 100) {
  // abcd, where a = d and b = c
  let largest = 0
  for (let x = max; x >= min; x--) {
    for (let y = max; y >= min; y--) {
      const product = x * y
      if (product < largest) {
        break
      }
      if (isPalindrome(product) && product > largest) {
        largest = product
      }
    }
  }
  return largest
}

function isPalindrome(n) {
  // O(n)
  const value = String(n)
  let start = 0
  let end = value.length - 1
  while (start < end) {
    if (value[start] !== value[end]) {
      return false
    }
    start++
    end--
  }
  return true
}

console.time("largestPalindromeProduct min 100 max 999")
const answer = largestPalindromeProduct(999, 100) // answer is 906609
console.timeEnd("largestPalindromeProduct min 100 max 999")
console.log(answer)
