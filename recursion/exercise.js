// https://www.theodinproject.com/lessons/javascript-recursive-methods#introduction
function printChildren(t) {
  if (!t.children) {
    return
  }
  console.log(t.name)
  t.children.forEach(printChildren)
}

const tree = {
  name: "john",
  children: [
    {
      name: "jim",
      children: [],
    },
    {
      name: "zoe",
      children: [
        {
          name: "kyle",
          children: [
            {
              name: ";,a",
              children: [],
            },
          ],
        },
        { name: "sophia", children: [] },
      ],
    },
  ],
}
// printChildren(tree)

function collatzConjecture(n) {
  if (n === 1) {
    console.log("n is one")
    return 0
  }
  console.log(n)
  if (n % 2 === 0) {
    return 1 + collatzConjecture(n / 2)
  } else {
    return 1 + collatzConjecture(3 * n + 1)
  }
}
// const steps = collatzConjecture(4213412341234123)
// console.log(`steps: ${steps}`)

// Question 1: Sum all numbers
// Write a function called sumRange. It will take a number and return the sum of all numbers from 1 up to the number passed in.
// Sample: sumRange(3) returns 6, since 1 + 2 + 3 = 6.
function sumRange(n) {
  if (n <= 1) {
    return 1
  }
  return n + sumRange(n - 1)
}
// console.log(sumRange(3))

// Question 2: Power function
// Write a function called power which takes in a base and an exponent. If the exponent is 0, return 1
function power(base, exponent) {
  if (exponent === 0) {
    return 1
  }
  return base * power(base, exponent - 1)
}
// console.log(power(2, 4)) // 16
// console.log(power(2, 3)) // 8
// console.log(power(2, 2)) // 4
// console.log(power(2, 1)) // 2
// console.log(power(2, 0)) // 1

// Question 3: Calculate factorial
// Write a function that returns the factorial of a number. As a quick refresher,
// a factorial of a number is the result of that number multiplied by the number before it, and the number before that number,
// and so on, until you reach 1. The factorial of 1 is just 1.
function factorial(n) {
  if (n <= 1) {
    return 1
  }
  return n * factorial(n - 1)
}
// console.log(factorial(5)) // 5 * 4 * 3 * 2 * 1 === 120

// Question 4: Check all values in an array
// Write a function called all which accepts an array and a callback and returns true if every value
// in the array returns true when passed as parameter to the callback function
function all(array, callback) {
  if (array.length === 0) {
    return true
  }
  return callback(array[0]) && all(array.slice(1), callback)
}
// const allAreLessThanSeven = all([1, 2, 9], function (num) {
//   return num < 7
// })
// console.log(allAreLessThanSeven) // false

// Question 5: Product of an array
// Write a function called productOfArray which takes in an array of numbers and
// returns the product of them all
function productOfArray(array) {
  if (array.length === 0) {
    return 1
  }
  return array[0] * productOfArray(array.slice(1))
}
// const six = productOfArray([1, 2, 3]) // 6
// const sixty = productOfArray([1, 2, 3, 10]) // 60
// console.log({ six, sixty })

// Question 6: Search JS object
// Write a function called contains that searches for a value in a nested object.
// It returns true if the object contains that value.
function contains(object, value) {
  // https://gist.github.com/JoshDevHub/b00125f483d4a1ecc257eaa030916973
  // null has typeof "object"
  if (typeof object !== "object" || object === null) {
    return object === value
  }
  const values = Object.values(object)
  return values.some((nextObject) => contains(nextObject, value))
}
// const nestedObject = {
//   data: {
//     info: {
//       stuff: {
//         thing: {
//           moreStuff: {
//             magicNumber: 44,
//             something: "foo2",
//           },
//         },
//       },
//     },
//   },
// }
// let hasIt = contains(nestedObject, 44) // true
// let doesntHaveIt = contains(nestedObject, "foo") // false
// console.log({ hasIt, doesntHaveIt })

// Question 7: Parse a multi-dimensional array
// Given a multi-dimensional integer array, return the total number of integers stored inside this array
// TODO https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion
function totalIntegers(input) {
  if (input == null || (Array.isArray(input) && input.length === 0)) {
    return 0
  }
  let total = 0
  const first = input[0]
  if (Array.isArray(first)) {
    total += totalIntegers(first)
  }
  if (Number.isInteger(first)) {
    total += 1
  }
  return total + totalIntegers(input.slice(1))
}
// const seven = totalIntegers([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]]) // 7
// console.log({ seven })

// Question 8:
// Write a function that sums squares of numbers in list that may contain more lists
function sumSquares(input) {
  if (input == null || (Array.isArray(input) && input.length === 0)) {
    return 0
  }
  let total = 0
  const first = input[0]
  if (Array.isArray(first)) {
    total += sumSquares(first)
  }
  if (Number.isInteger(first)) {
    total += first * first
  }
  return total + sumSquares(input.slice(1))
}
// let l = [1, 2, 3]
// console.log(sumSquares(l)) // 1 + 4 + 9 = 14

// l = [[1, 2], 3]
// console.log(sumSquares(l)) // 1 + 4 + 9 = 14

// l = [[[[[[[[[1]]]]]]]]]
// console.log(sumSquares(l)) // 1 = 1

// l = [10, [[10], 10], [10]]
// console.log(sumSquares(l)) // 100 + 100 + 100 + 100 = 400

// Question 9:
// The function should return an array containing repetitions of the number argument.
// For instance, replicate(3, 5) should return [5,5,5].
// If the times argument is negative, return an empty array.
function replicate(repeat, value) {
  if (repeat <= 0) {
    return []
  }
  const output = []
  output.push(value)
  const rest = replicate(repeat - 1, value)
  return [...output, ...rest]
}
// console.log(replicate(3, 5)) // [5, 5, 5]
// console.log(replicate(1, 69)) // [69]
// console.log(replicate(-2, 6)) // []

// 5 Simple Steps for Solving Any Recursive Problem
// https://www.youtube.com/watch?v=ngCos392W4w
// write a recursive function that given input n, sums all nonnegative integers up to n
function sumNonNegativeIntegers(n, total = 0) {
  if (n <= 0) {
    return total
  }
  // tail recursion optimization, where recursion is last steps
  return sumNonNegativeIntegers(n - 1, total + n)
}
// console.log(sumNonNegativeIntegers(5)) // 15

// write a function that takes two inputs n and m
// and outputs the number of unique paths from the top left corner to bottom right corner
// of a n x m grid
// Constraints: you can only move down or right 1 unit at a time
function uniquePaths(n, m) {
  const goal = [n - 1, m - 1]
  const start = [0, 0]
  const paths = uniquePathsHelper(start, goal)
  console.log(paths)
}

function uniquePathsHelper(current, goal, path = [], outputPaths = []) {
  const [goalRow, goalCol] = goal
  const [currentRow, currentCol] = current
  if (currentRow === goalRow && currentCol === goalCol) {
    return { path, outputPaths: [...outputPaths, path], count: 1 }
  }
  if (currentRow > goalRow || currentCol > goalCol) {
    return { path: "", outputPaths: [], count: 0 }
  }
  // try moving down to find a path, try moving right to find a path
  const moveDown = uniquePathsHelper(
    [currentRow + 1, currentCol],
    goal,
    [...path, "down"],
    outputPaths
  )
  const moveRight = uniquePathsHelper(
    [currentRow, currentCol + 1],
    goal,
    [...path, "right"],
    outputPaths
  )
  return {
    count: moveDown.count + moveRight.count,
    outputPaths: [moveDown.outputPaths, moveRight.outputPaths].flat(1),
  }
}
uniquePaths(2, 4)
uniquePaths(3, 7)
