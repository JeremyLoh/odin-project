import Node from "./node.js"

export default class Tree {
  constructor(array) {
    this._array = array
    this._root = this.buildTree(array)
  }

  get root() {
    return this._root
  }

  buildTree(array) {
    // takes an array of data and turns it into a balanced binary tree of Node objects
    // return level-0 root node
    if (array == null || array.length === 0) {
      return null
    }
    if (array.length === 1) {
      return new Node(array[0], null, null)
    }
    // sort and remove duplicates
    const sortedArray = this._sort([...new Set(array)])
    const mid = Math.floor(sortedArray.length / 2)
    const leftTree = this.buildTree(sortedArray.slice(0, mid))
    // skip middle element (mid + 1)
    const rightTree = this.buildTree(sortedArray.slice(mid + 1))
    const root = new Node(sortedArray[mid], leftTree, rightTree)
    return root
  }

  _sort(array) {
    // mergesort
    if (array.length === 1 || !array) {
      return array
    }
    const size = array.length
    const mid = Math.floor(size / 2)
    const left = this._sort(array.slice(0, mid))
    const right = this._sort(array.slice(mid))
    return this._merge(left, right)
  }

  _merge(left, right) {
    let x = 0
    let y = 0
    let leftSize = left.length
    let rightSize = right.length
    const output = []
    while (x < leftSize && y < rightSize) {
      const leftCurrent = left[x]
      const rightCurrent = right[y]
      if (leftCurrent < rightCurrent) {
        output.push(leftCurrent)
        x++
      } else {
        output.push(rightCurrent)
        y++
      }
    }
    // copy remaining elements
    if (x < leftSize) {
      output.push(...left.slice(x))
    }
    if (y < rightSize) {
      output.push(...right.slice(y))
    }
    return output
  }
}
