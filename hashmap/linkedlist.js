import Node from "./node.js"

export default class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this._size = 0
  }

  append(key, value) {
    const node = new Node(key, value)
    if (this.tail) {
      this.tail.next = node
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }
    this.size++
  }

  prepend(key, value) {
    const node = new Node(key, value)
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

  get size() {
    return this._size
  }

  set size(x) {
    if (x < 0) {
      return
    }
    this._size = x
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

  contains(key) {
    if (this.size === 0) {
      return false
    }
    let current = this.head
    while (current) {
      if (current.key === key) {
        return true
      }
      current = current.next
    }
    return false
  }

  find(key) {
    // return index of the node containing key, or null if not found
    if (this.size === 0) {
      return null
    }
    let current = this.head
    for (let i = 0; i < this.size && current; i++) {
      if (current.key === key) {
        return i
      }
      current = current.next
    }
    return null
  }

  toString() {
    // format of ( value ) -> ( value ) -> null
    let output = ""
    let current = this.head
    while (current) {
      output += `( ${current.value} ) -> `
      current = current.next
    }
    output += "null"
    return output
  }

  insertAt(key, value, index) {
    if (index < 0) {
      return
    }
    const node = new Node(key, value)
    if (!this.head) {
      this.head = node
      this.tail = node
      this.size = 1
      return
    }
    if (index === 0) {
      node.next = this.head
      this.head = node
      this.size++
      return
    }
    if (index >= this.size) {
      this.tail.next = node
      this.tail = node
      this.size++
      return
    }
    let currentIndex = 0
    let current = this.head
    while (current && currentIndex < index - 1) {
      current = current.next
      currentIndex++
    }
    node.next = current.next
    current.next = node
    this.size++
  }

  removeAt(index) {
    if (this.size === 0 || index < 0 || index >= this.size) {
      return null
    }
    if (this.size === 1) {
      const node = this.head
      this.head = null
      this.tail = null
      this.size = 0
      return node
    }
    if (index === 0) {
      const node = this.head
      this.head = this.head.next
      this.size--
      return node
    }
    let current = this.head
    let currentIndex = 0
    while (current && currentIndex < index - 1) {
      current = current.next
      currentIndex++
    }
    if (current.next === this.tail) {
      const node = this.tail
      this.tail = current
      current.next = null
      this.size--
      return node
    }
    const node = current.next
    current.next = current.next.next
    node.next = null
    this.size--
    return node
  }
}
