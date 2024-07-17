import LinkedList from "./linkedlist"

export default class HashMap {
  constructor(bucketSize = 16, loadFactor = 0.75) {
    this.bucketSize = bucketSize
    this.loadFactor = loadFactor
    this.buckets = new Array(bucketSize)
    this.size = 0
  }

  hash(key) {
    let hashCode = 1
    const primeNumber = 31
    for (let i = 0; i < key.length; i++) {
      hashCode = hashCode * primeNumber + key.charCodeAt(i)
    }
    return hashCode
  }

  set(key, value) {
    const index = this.hash(key) % this.bucketSize
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound")
    }
    const existingLinkedList = this.buckets[index]
    if (!existingLinkedList) {
      const linkedList = new LinkedList()
      linkedList.append(key, value)
      this.buckets[index] = linkedList
      this.size++
      // TODO grow bucket size based on load factor
      return
    }
    if (existingLinkedList.contains(key)) {
      // if key exists, then old value is overriden
      const existingIndex = existingLinkedList.find(key)
      existingLinkedList.removeAt(existingIndex)
      existingLinkedList.prepend(key, value)
    } else {
      // if there is a collision (two different key get same hash code), add to linked list
      existingLinkedList.prepend(key, value)
      this.size++
    }
    // TODO grow bucket size based on load factor
  }

  get(key) {
    // return value assigned to this key. If key not found, return null
    const index = this.hash(key) % this.bucketSize
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound")
    }
    const linkedList = this.buckets[index]
    if (!linkedList) {
      return null
    }
    const nodeIndex = linkedList.find(key)
    if (nodeIndex == null) {
      return null
    }
    return linkedList.at(nodeIndex)?.value
  }

  has(key) {
    // take a key and return true or false based on whether key is in the hash map
    if (this.size === 0) {
      return false
    }
    const isKeyPresent = this.get(key) != null
    return isKeyPresent
  }

  remove(key) {
    // TODO if given key is in hash map, remove the entry with that key and return true
    // if key isn't in the hash map, it should return false
  }

  length() {
    // return the number of stored keys in the hash map
    return this.size
  }

  clear() {
    // removes all entries in the hash map
    for (let i = 0; i < this.bucketSize; i++) {
      this.buckets[i] = null
    }
    this.size = 0
  }

  keys() {
    // return an array containing all the keys inside hash map
    const output = []
    for (const list of this.buckets) {
      if (list == null) {
        continue
      }
      const size = list.size
      for (let i = 0; i < size; i++) {
        output.push(list.at(i).key)
      }
    }
    return output
  }

  values() {
    // TODO return an array containing all the values
  }

  entries() {
    // TODO return array that contain each key, value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  }
}
