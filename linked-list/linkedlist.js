import Node from "./node.js"

export default class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  append(value) {
    const node = new Node(value)
    if (this.tail) {
      this.tail.next = node
      this.tail = node
      this.size++
    } else {
      this.head = node
      this.tail = node
      this.size = 1
    }
  }

  prepend(value) {
    // TODO add new node to start of list
  }

  size() {
    // TODO return total number of nodes in list
  }

  head() {
    // TODO return first node in list
  }

  tail() {
    // TODO return last node in list
  }

  at(index) {
    // TODO return node at given index
  }

  pop() {
    // TODO remove last element from the list
  }

  contains(value) {
    // TODO return true if passed in value is in list
  }

  find(value) {
    // TODO return index of the node containing value, or null if not found
  }

  toString() {
    // TODO return linked list objects as strings: format of ( value ) -> ( value ) -> null
  }

  insertAt(value, index) {
    // TODO insert new node with provided value at given index
  }

  removeAt(index) {
    // TODO remove node at given index
  }
}
