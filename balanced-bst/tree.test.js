import { describe, expect, test } from "vitest"
import Tree from "./tree"

describe("buildTree()", () => {
  test("one item", () => {
    const array = [3]
    const tree = new Tree(array)
    expect(tree.root.data).toBe(3)
    expect(tree.root.leftChild).toBe(null)
    expect(tree.root.rightChild).toBe(null)
  })

  test("two items", () => {
    const array = [5, 3]
    const tree = new Tree(array)
    expect(tree.root.data).toBe(5)
    expect(tree.root.rightChild).toBe(null)

    const leftNode = tree.root.leftChild
    expect(leftNode.data).toBe(3)
    expect(leftNode.leftChild).toBe(null)
    expect(leftNode.rightChild).toBe(null)
  })

  test("duplicate items are removed", () => {
    //   3
    //  2 4
    // 1
    const array = [4, 3, 2, 4, 1]
    const tree = new Tree(array)
    expect(tree.root.data).toBe(3)
    const left = tree.root.leftChild
    const right = tree.root.rightChild
    expect(left.data).toBe(2)
    expect(left.leftChild.data).toBe(1)
    expect(left.rightChild).toBe(null)

    expect(right.data).toBe(4)
    expect(right.leftChild).toBe(null)
    expect(right.rightChild).toBe(null)
  })
})

describe("insert(value)", () => {
  test("empty tree", () => {
    const tree = new Tree([])
    expect(tree.root).toBe(null)
    tree.insert(3)
    expect(tree.root.data).toBe(3)
  })

  test("one element tree, insert as right child of root element", () => {
    const tree = new Tree([2])
    tree.insert(3)
    expect(tree.root.data).toBe(2)
    expect(tree.root.leftChild).toBe(null)
    const rootRightChild = tree.root.rightChild
    expect(rootRightChild.data).toBe(3)
    expect(rootRightChild.leftChild).toBe(null)
    expect(rootRightChild.rightChild).toBe(null)
  })

  test("one element tree, insert as left child of root element", () => {
    const tree = new Tree([2])
    tree.insert(0)
    expect(tree.root.data).toBe(2)
    const rootLeftChild = tree.root.leftChild
    expect(rootLeftChild.data).toBe(0)
    expect(rootLeftChild.leftChild).toBe(null)
    expect(rootLeftChild.rightChild).toBe(null)
    expect(tree.root.rightChild).toBe(null)
  })

  test("prevent duplicate element insertion", () => {
    const tree = new Tree([2, 0, 1])
    tree.insert(0)
    tree.insert(1)
    tree.insert(2)
    expect(tree.root.data).toBe(1)

    const leftNode = tree.root.leftChild
    expect(leftNode.data).toBe(0)
    expect(leftNode.leftChild).toBe(null)
    expect(leftNode.rightChild).toBe(null)

    const rightNode = tree.root.rightChild
    expect(rightNode.data).toBe(2)
    expect(rightNode.leftChild).toBe(null)
    expect(rightNode.rightChild).toBe(null)
  })

  test("multiple element tree", () => {
    const tree = new Tree([3, 2, 1])
    tree.insert(20)
    tree.insert(19)
    expect(tree.root.rightChild.rightChild.data).toBe(20)
    expect(tree.root.rightChild.rightChild.leftChild.data).toBe(19)
    expect(tree.root.rightChild.rightChild.rightChild).toBe(null)
  })
})
