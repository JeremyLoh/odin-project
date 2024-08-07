import Node from "./node.js"

export default class Tree {
  constructor(array = []) {
    this._array = array
    this._root = this.buildTree(array)
  }

  get root() {
    return this._root
  }

  prettyPrint(node = this._root, prefix = "", isLeft = true) {
    if (node === null) {
      return
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      )
    }
  }

  levelOrder(callback) {
    // traverse tree in breadth-first level order, provide each node as argument to given callback
    // returns an array of values if no callback is given as argument
    if (this._root == null) {
      return []
    }
    const traversedValues = []
    const queue = [this._root]
    while (queue.length > 0) {
      const current = queue.shift()
      if (callback != null) {
        callback(current)
      } else {
        traversedValues.push(current.data)
      }
      if (current.leftChild) {
        queue.push(current.leftChild)
      }
      if (current.rightChild) {
        queue.push(current.rightChild)
      }
    }
    if (callback == null) {
      return traversedValues
    }
  }

  inOrder(callback) {
    // traverse in order (left, current, right), yield each node to provided callback
    // if no callback is given, return an array of values traversed
    const traversedNodes = []
    const stack = []
    let current = this._root
    while (stack.length > 0 || current != null) {
      // keep adding left child until null is reached
      while (current != null) {
        stack.push(current)
        current = current.leftChild
      }
      current = stack.pop()
      if (callback != null) {
        callback(current)
      } else {
        traversedNodes.push(current.data)
      }
      current = current.rightChild
    }
    if (callback == null) {
      return traversedNodes
    }
  }

  preOrder(callback) {
    const traversedNodes = []
    const stack = []
    let current = this._root
    while (stack.length > 0 || current != null) {
      // visit current node
      if (current == null) {
        current = stack.pop()
      }
      if (callback != null) {
        callback(current)
      } else {
        traversedNodes.push(current.data)
      }
      // push right node if it exists to stack
      if (current.rightChild != null) {
        stack.push(current.rightChild)
      }
      // set current node to left node, so we visit left in next iteration
      current = current.leftChild
    }
    if (callback == null) {
      return traversedNodes
    }
  }

  postOrder(callback, currentNode = this._root, traversedNodes = []) {
    if (currentNode == null) {
      if (callback == null) {
        return traversedNodes
      }
      return
    }
    this.postOrder(callback, currentNode.leftChild, traversedNodes)
    this.postOrder(callback, currentNode.rightChild, traversedNodes)
    if (currentNode != null && callback != null) {
      callback(currentNode)
    } else {
      traversedNodes.push(currentNode.data)
    }
    if (callback == null) {
      return traversedNodes
    }
  }

  find(value) {
    if (value == null || this._root == null) {
      return null
    }
    let current = this._root
    while (current != null) {
      if (current.data === value) {
        break
      }
      if (value > current.data) {
        current = current.rightChild
      }
      if (value < current.data) {
        current = current.leftChild
      }
    }
    return current
  }

  insert(value) {
    if (this._root == null) {
      this._root = new Node(value, null, null)
      return
    }
    let current = this._root
    const node = new Node(value, null, null)
    // keep recursing until there is no subtree, then insert the node
    while (current != null) {
      if (current.data === value) {
        // prevent insertion for duplicate values
        break
      }
      if (value > current.data) {
        if (current.rightChild == null) {
          current.rightChild = node
          this._array.push(value)
          break
        }
        current = current.rightChild
      }
      if (value < current.data) {
        if (current.leftChild == null) {
          current.leftChild = node
          this._array.push(value)
          break
        }
        current = current.leftChild
      }
    }
  }

  deleteItem(value) {
    if (value == null || this._root == null) {
      return
    }
    let current = this._root
    while (current != null) {
      if (current.data === value) {
        break
      }
      if (value < current.data) {
        current = current.leftChild
      }
      if (value > current.data) {
        current = current.rightChild
      }
    }
    this._replaceNode(current)
  }

  _replaceNode(node) {
    if (node == null) {
      return
    }
    const isRootNode = node.data === this._root.data // there are no duplicates in tree
    const isLeafNode = node.leftChild == null && node.rightChild == null
    if (isLeafNode && isRootNode) {
      this._root = null
      this._array = []
      return
    }
    // XOR operator, check that only one subtree exists, (A AND !B) OR (!A AND B)
    const hasOnlyOneSubtree =
      ((node.leftChild == null) ^ (node.rightChild == null)) === 1
    if (hasOnlyOneSubtree || (isLeafNode && !isRootNode)) {
      this._replaceParentWithNodeSubtree(node)
      return
    }
    const leftSubtreeHeight = this.height(node.leftChild)
    const rightSubtreeHeight = this.height(node.rightChild)
    if (leftSubtreeHeight > rightSubtreeHeight) {
      const predecessor = this._getPredecessor(node)
      if (predecessor.leftChild == null && predecessor.rightChild == null) {
        // predecessor has no child, remove predecessor's parent reference to predecessor
        this._replaceParentWithNodeSubtree(predecessor)
        node.data = predecessor.data
      } else {
        // only left subtree exist for predecessor node
        const predecessorLeftSubtree = predecessor.leftChild
        predecessorLeftSubtree.parent = predecessor.parent
        node.leftChild = predecessorLeftSubtree
        node.data = predecessor.data
      }
    } else {
      const successor = this._getSuccessor(node)
      if (successor.leftChild == null && successor.rightChild == null) {
        // successor has no child, remove successor's parent reference to successor
        this._replaceParentWithNodeSubtree(successor)
        node.data = successor.data
      } else {
        // only right subtree exist for successor node
        const successorRightSubtree = successor.rightChild
        successorRightSubtree.parent = successor.parent
        node.data = successor.data
      }
    }
  }

  _replaceParentWithNodeSubtree(node) {
    const parent = node.parent
    const subtree = node.leftChild || node.rightChild
    if (subtree != null) {
      subtree.parent = parent
    }
    if (parent.leftChild != null && parent.leftChild.data === node.data) {
      parent.leftChild = subtree
    } else {
      parent.rightChild = subtree
    }
    this._removeNodeFromArray(node.data)
  }

  _removeNodeFromArray(value) {
    const index = this._array.indexOf(value)
    if (index !== -1) {
      this._array.splice(index, 1)
    }
  }

  height(node, currentHeight = 0) {
    // get number of edges on longest path from given node to a leaf
    // https://stackoverflow.com/questions/2603692/what-is-the-difference-between-depth-and-height-in-a-tree
    if (node == null) {
      return currentHeight
    }
    return Math.max(
      this.height(node.leftChild, currentHeight + (node.leftChild ? 1 : 0)),
      this.height(node.rightChild, currentHeight + (node.rightChild ? 1 : 0))
    )
  }

  depth(node) {
    // depth is defined as the number of edges in the path from a given node to the tree’s root node
    if (node == null || this._root == null) {
      return 0
    }
    let current = node
    let edges = 0
    while (current != null && current.data != this._root.data) {
      current = current.parent
      edges++
    }
    return edges
  }

  isBalanced() {
    // balanced tree is where every node, the difference between heights of left and right subtree of every node is not more than one
    if (this._root == null) {
      return true
    }
    const stack = [this._root]
    while (stack.length > 0) {
      const current = stack.pop()
      const leftHeight =
        current.leftChild == null ? -1 : this.height(current.leftChild)
      const rightHeight =
        current.rightChild == null ? -1 : this.height(current.rightChild)
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false
      }
      if (current.leftChild != null) {
        stack.push(current.leftChild)
      }
      if (current.rightChild != null) {
        stack.push(current.rightChild)
      }
    }
    return true
  }

  rebalance() {
    if (this.isBalanced()) {
      return
    }
    // traverse array in order, pass the values to build tree function
    const inOrderValues = this.inOrder()
    this._root = this.buildTree(inOrderValues)
  }

  _getPredecessor(node) {
    // get right most element in the left subtree (greatest value in left subtree)
    if (node == null || node.leftChild == null) {
      return null
    }
    let current = node.leftChild
    while (current.rightChild != null) {
      current = current.rightChild
    }
    return current
  }

  _getSuccessor(node) {
    // get left most element in the right subtree (smallest value in right subtree)
    if (node == null || node.rightChild == null) {
      return null
    }
    let current = node.rightChild
    while (current.leftChild != null) {
      current = current.leftChild
    }
    return current
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
    if (leftTree != null) {
      leftTree.parent = root
    }
    if (rightTree != null) {
      rightTree.parent = root
    }
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
