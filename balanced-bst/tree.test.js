import { afterEach, describe, expect, test, vi } from "vitest"
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

describe("find(value)", () => {
  test("empty tree", () => {
    const tree = new Tree([])
    expect(tree.find(null)).toBe(null)
    expect(tree.find(3)).toBe(null)
  })

  test("one item in tree", () => {
    const tree = new Tree([2])
    expect(tree.find(null)).toBe(null)
    expect(tree.find(2).data).toBe(2)
    expect(tree.find(2).leftChild).toBe(null)
    expect(tree.find(2).rightChild).toBe(null)
  })

  test("multiple items in tree", () => {
    // tree of [1,2,3,4,5]
    //    3
    //  2   5
    // 1   4
    const tree = new Tree([1, 2, 3, 4, 5])
    expect(tree.find(0)).toBe(null)
    expect(tree.find(1).data).toBe(1)
    expect(tree.find(2).data).toBe(2)
    expect(tree.find(3).data).toBe(3)
    expect(tree.find(4).data).toBe(4)
    expect(tree.find(5).data).toBe(5)
  })
})

describe("levelOrder(callback)", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test("no callback given returns array of values", () => {
    // tree of [1,2,3]
    //  2
    // 1 3
    const tree = new Tree([1, 2, 3])
    expect(tree.levelOrder()).to.deep.equal([2, 1, 3])
    const emptyTree = new Tree([])
    expect(emptyTree.levelOrder()).to.deep.equal([])
    const singleItemTree = new Tree([2])
    expect(singleItemTree.levelOrder()).to.deep.equal([2])
  })

  test("perform callback in breadth-first level order", () => {
    // tree of [1,2,3,4,5]
    //    3
    //  2   5
    // 1   4
    const tree = new Tree([1, 2, 3, 4, 5])
    const callback = vi.fn()
    tree.levelOrder(callback)
    // check the node data present for argument passed to callback
    const dataPassedToCallback = callback.mock.calls.map((node) => node[0].data)
    expect(dataPassedToCallback).to.deep.equal([3, 2, 5, 1, 4])
  })
})

describe("tree traversals", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("inOrder(callback)", () => {
    test("empty tree", () => {
      const tree = new Tree()
      expect(tree.inOrder()).to.deep.equal([])
    })

    test("no callback given returns array of values in order (left, current, right)", () => {
      // tree of [1,2,3,4,5,6]
      //      4
      //   2      6
      // 1   3  5
      const tree = new Tree([1, 2, 3, 4, 5, 6])
      expect(tree.inOrder()).to.deep.equal([1, 2, 3, 4, 5, 6])
    })

    test("given callback is passed arguments in order (left, current, right)", () => {
      // tree of [1,2,3,4,5,6]
      //      4
      //   2      6
      // 1   3  5
      const tree = new Tree([1, 2, 3, 4, 5, 6])
      const callback = vi.fn()
      tree.inOrder(callback)
      const dataPassedToCallback = callback.mock.calls.map(
        (node) => node[0].data
      )
      expect(dataPassedToCallback).to.deep.equal([1, 2, 3, 4, 5, 6])
    })
  })

  describe("preOrder(callback)", () => {
    test("empty tree", () => {
      const tree = new Tree([])
      expect(tree.preOrder()).to.deep.equal([])
    })

    test("no callback returns array of values in pre order (current, left, right)", () => {
      // tree of [1,2,3,4,5,6]
      //      4
      //   2      6
      // 1   3  5
      const tree = new Tree([1, 2, 3, 4, 5, 6])
      expect(tree.preOrder()).to.deep.equal([4, 2, 1, 3, 6, 5])
    })

    test("given callback is passed arguments in order (current, left, right)", () => {
      // tree of [1,2,3,4,5,6]
      //      4
      //   2      6
      // 1   3  5
      const tree = new Tree([1, 2, 3, 4, 5, 6])
      const callback = vi.fn()
      tree.preOrder(callback)
      const dataPassedToCallback = callback.mock.calls.map(
        (node) => node[0].data
      )
      expect(dataPassedToCallback).to.deep.equal([4, 2, 1, 3, 6, 5])
    })
  })

  describe("postOrder(callback)", () => {
    test("empty tree", () => {
      const tree = new Tree([])
      expect(tree.postOrder()).to.deep.equal([])
    })

    test("no callback returns array of values in post order (left, right, current)", () => {
      // tree of [1,2,3,4,5,6]
      //      4
      //   2      6
      // 1   3  5
      const tree = new Tree([1, 2, 3, 4, 5, 6])
      expect(tree.postOrder()).to.deep.equal([1, 3, 2, 5, 6, 4])
    })

    test("given callback is passed arguments in order (left, right, current)", () => {
      // tree of [1,2,3,4,5,6]
      //      4
      //   2      6
      // 1   3  5
      const tree = new Tree([1, 2, 3, 4, 5, 6])
      const callback = vi.fn()
      tree.postOrder(callback)
      const dataPassedToCallback = callback.mock.calls.map(
        (node) => node[0].data
      )
      expect(dataPassedToCallback).to.deep.equal([1, 3, 2, 5, 6, 4])
    })
  })
})

describe("height(node)", () => {
  test("height of null subtree is zero", () => {
    const tree = new Tree([2])
    const root = tree.find(2)
    expect(tree.height(root.leftChild)).toBe(0)
  })

  test("tree with one item", () => {
    const tree = new Tree([2])
    const root = tree.find(2)
    expect(tree.height(root)).toBe(0)
  })

  test("tree with two items", () => {
    const tree = new Tree([1, 2])
    const root = tree.find(2)
    expect(tree.height(root)).toBe(1)
    expect(tree.height(tree.find(1))).toBe(0)
  })

  test("tree with multiple items", () => {
    // tree of [1,2,3,4,5,6]
    //      4
    //   2      6
    // 1   3  5
    const tree = new Tree([1, 2, 3, 4, 5, 6])
    expect(tree.height(tree.find(4))).toBe(2)
    expect(tree.height(tree.find(2))).toBe(1)
  })
})

describe("depth(node)", () => {
  test("empty tree returns zero", () => {
    const tree = new Tree([])
    expect(tree.depth(null)).toBe(0)
  })

  test("one item tree returns zero", () => {
    const tree = new Tree([2])
    expect(tree.depth(tree.find(2))).toBe(0)
  })

  test("two item tree returns one for leaf node", () => {
    const tree = new Tree([1, 2])
    expect(tree.depth(tree.find(1))).toBe(1)
  })

  test("multiple item tree", () => {
    // tree of [1,2,3,4,5,6]
    //      4
    //   2      6
    // 1   3  5
    const tree = new Tree([1, 2, 3, 4, 5, 6])
    expect(tree.depth(tree.find(1))).toBe(2)
    expect(tree.depth(tree.find(3))).toBe(2)
    expect(tree.depth(tree.find(5))).toBe(2)
    expect(tree.depth(tree.find(2))).toBe(1)
    expect(tree.depth(tree.find(6))).toBe(1)
    expect(tree.depth(tree.find(4))).toBe(0)
  })
})

describe("isBalanced()", () => {
  test("empty tree is balanced", () => {
    const tree = new Tree([])
    expect(tree.isBalanced()).toBe(true)
  })

  test("one item tree is balanced", () => {
    const tree = new Tree([2])
    expect(tree.isBalanced()).toBe(true)
  })

  test("multiple item tree with height difference of one is balanced", () => {
    //   1
    // -1 2
    //     3
    const tree = new Tree([1])
    tree.insert(2)
    expect(tree.isBalanced()).toBe(true)
    tree.insert(-1)
    expect(tree.isBalanced()).toBe(true)
    tree.insert(3)
    expect(tree.isBalanced()).toBe(true)
  })

  test("multiple item tree with height difference of more than one is not balanced", () => {
    // create the following tree
    //     6
    //    5  7
    //   2
    //    4
    const tree = new Tree([5, 6, 7])
    expect(tree.isBalanced()).toBe(true)
    tree.insert(2)
    expect(tree.isBalanced()).toBe(true)
    tree.insert(4)
    expect(tree.isBalanced()).toBe(false)
  })

  test("left subtree is empty, but right subtree has height of two should be not balanced", () => {
    // 2
    //  3
    //   4
    const tree = new Tree([2])
    tree.insert(3)
    tree.insert(4)
    expect(tree.isBalanced()).toBe(false)
  })
})

describe("rebalance()", () => {
  test("tree with height of two", () => {
    const tree = new Tree([2])
    tree.insert(3)
    tree.insert(4)
    expect(tree.isBalanced()).toBe(false)
    tree.rebalance()

    expect(tree.isBalanced()).toBe(true)
    expect(tree.find(3).leftChild.data).toBe(2)
    expect(tree.find(3).rightChild.data).toBe(4)

    expect(tree.find(2).parent.data).toBe(3)
    expect(tree.find(2).leftChild).toBe(null)
    expect(tree.find(2).rightChild).toBe(null)

    expect(tree.find(4).parent.data).toBe(3)
    expect(tree.find(4).leftChild).toBe(null)
    expect(tree.find(4).rightChild).toBe(null)
  })
})
