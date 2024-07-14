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
    } else {
      this.head = node
      this.tail = node
    }
    this.size++
  }

  prepend(value) {
    const node = new Node(value)
    if (this.head) {
      const temp = this.head
      this.head = node
      this.head.next = temp
    } else {
      this.head = node
      this.tail = node
    }
    this.size++
  }

  size() {
    return this.size
  }

  head() {
    return this.head
  }

  tail() {
    return this.tail
  }

  at(index) {
    if (this.size === 0 || index > this.size - 1 || index < 0) {
      return null
    }
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current.next
    }
    return current
  }

  pop() {
    if (this.size === 0) {
      return null
    }
    if (this.size === 1) {
      const item = this.head
      this.head = null
      this.tail = null
      this.size = 0
      return item
    }
    let current = this.head
    for (let i = 0; i < this.size - 2; i++) {
      current = current.next
    }
    const lastItem = this.tail
    current.next = null
    this.tail = current
    this.size--
    return lastItem
  }

  contains(value) {
    if (this.size === 0) {
      return false
    }
    let current = this.head
    while (current) {
      if (current.value === value) {
        return true
      }
      current = current.next
    }
    return false
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
