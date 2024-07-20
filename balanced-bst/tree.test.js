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

describe("deleteItem(value)", () => {
  test("empty tree", () => {
    const tree = new Tree([])
    tree.deleteItem(null)
    tree.deleteItem(0)
    expect(tree.root).toBe(null)
  })

  test("one item in tree, should make tree empty", () => {
    const tree = new Tree([2])
    tree.deleteItem(2)
    expect(tree.root).toBe(null)
  })

  test("deleting leaf node", () => {
    const tree = new Tree([1, 2, 3])
    tree.deleteItem(1)
    expect(tree.root.data).toBe(2)
    expect(tree.root.leftChild).toBe(null)
    expect(tree.root.rightChild.data).toBe(3)

    tree.deleteItem(3)
    expect(tree.root.data).toBe(2)
    expect(tree.root.leftChild).toBe(null)
    expect(tree.root.rightChild).toBe(null)
  })

  test("delete node with only left child subtree", () => {
    // tree of [1,2,3,4]
    //   3
    //  2 4
    // 1
    const tree = new Tree([1, 2, 3, 4])
    tree.deleteItem(2)
    expect(tree.root.data).toBe(3)
    const left = tree.root.leftChild
    expect(left.data).toBe(1)
    expect(left.leftChild).toBe(null)
    expect(left.rightChild).toBe(null)

    const right = tree.root.rightChild
    expect(right.data).toBe(4)
    expect(right.leftChild).toBe(null)
    expect(right.rightChild).toBe(null)
  })

  test("delete node with only right child subtree", () => {
    // tree of [4,5,6,7,8]
    //   6
    //  5 7
    // 4   8
    const tree = new Tree([4, 5, 6, 7, 8])
    tree.deleteItem(7)
    expect(tree.root.data).toBe(6)
    const left = tree.root.leftChild
    expect(left.data).toBe(5)
    expect(left.leftChild.data).toBe(4)
    expect(left.leftChild.leftChild).toBe(null)
    expect(left.leftChild.rightChild).toBe(null)
    expect(left.rightChild).toBe(null)

    const right = tree.root.rightChild
    expect(right.data).toBe(8)
    expect(right.leftChild).toBe(null)
    expect(right.rightChild).toBe(null)
  })

  test("delete node that has left and right subtree via successor", () => {
    // tree of [4,5,6,7,8,9]
    //     7
    //   5   9
    // 4  6 8
    const tree = new Tree([4, 5, 6, 7, 8, 9])
    expect(tree.root.data).toBe(7)
    tree.deleteItem(5)
    // expected tree
    //     7
    //   6   9
    // 4    8
    expect(tree.root.data).toBe(7)
    expect(tree.root.leftChild.data).toBe(6)
    expect(tree.root.leftChild.parent.data).toBe(7)

    expect(tree.root.leftChild.leftChild.data).toBe(4)
    expect(tree.root.leftChild.leftChild.parent.data).toBe(6)
    expect(tree.root.leftChild.rightChild).toBe(null)

    expect(tree.root.rightChild.data).toBe(9)
    expect(tree.root.rightChild.rightChild).toBe(null)

    expect(tree.root.rightChild.leftChild.data).toBe(8)
    expect(tree.root.rightChild.leftChild.leftChild).toBe(null)
    expect(tree.root.rightChild.leftChild.rightChild).toBe(null)
  })

  test("delete node that has left and right subtree via predecessor", () => {
    // tree of [4,5,6,7,9,10,15,16]
    //         9
    //     6      15
    //   5   7  10  16
    // 4
    const tree = new Tree([4, 5, 6, 7, 9, 10, 15, 16])
    expect(tree.root.data).toBe(9)
    tree.deleteItem(6)
    // expected tree
    //         9
    //     5      15
    //   4   7  10  16
    expect(tree.root.data).toBe(9)
    const leftTree = tree.root.leftChild
    expect(leftTree.data).toBe(5)
    expect(leftTree.parent.data).toBe(9)

    expect(leftTree.leftChild.data).toBe(4)
    expect(leftTree.leftChild.parent.data).toBe(5)
    expect(leftTree.leftChild.leftChild).toBe(null)
    expect(leftTree.leftChild.rightChild).toBe(null)

    expect(leftTree.rightChild.data).toBe(7)
    expect(leftTree.rightChild.parent.data).toBe(5)
    expect(leftTree.rightChild.leftChild).toBe(null)
    expect(leftTree.rightChild.rightChild).toBe(null)

    const rightTree = tree.root.rightChild
    expect(rightTree.data).toBe(15)
    expect(rightTree.parent.data).toBe(9)

    expect(rightTree.leftChild.data).toBe(10)
    expect(rightTree.leftChild.parent.data).toBe(15)
    expect(rightTree.leftChild.leftChild).toBe(null)
    expect(rightTree.leftChild.rightChild).toBe(null)

    expect(rightTree.rightChild.data).toBe(16)
    expect(rightTree.rightChild.parent.data).toBe(15)
    expect(rightTree.rightChild.leftChild).toBe(null)
    expect(rightTree.rightChild.rightChild).toBe(null)
  })
})
