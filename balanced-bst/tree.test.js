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
