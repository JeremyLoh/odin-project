import LinkedList from "./linkedlist.js"

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

  growBucket() {
    // need to get new hash for each item as bucket size changed
    const newBucketSize = this.bucketSize * 2
    const newBucket = new Array(newBucketSize)
    for (const list of this.buckets) {
      if (list == null) {
        continue
      }
      const size = list.size
      for (let i = 0; i < size; i++) {
        const item = list.at(i)
        const newBucketIndex = this.hash(item.key) % newBucketSize
        newBucket[newBucketIndex] =
          newBucket[newBucketIndex] || new LinkedList()
        newBucket[newBucketIndex].append(item.key, item.value)
      }
    }
    this.buckets = newBucket
    this.bucketSize = newBucketSize
  }

  isLoadFactorExceeded() {
    return this.size / this.bucketSize > this.loadFactor
  }

  set(key, value) {
    const index = this.hash(key) % this.bucketSize
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound")
    }
    const existingList = this.buckets[index]
    if (!existingList) {
      const list = new LinkedList()
      list.append(key, value)
      this.buckets[index] = list
      this.size++
      // grow bucket size based on load factor
      if (this.isLoadFactorExceeded()) {
        this.growBucket()
      }
      return
    }
    if (existingList.contains(key)) {
      // if key exists, then old value is overriden
      const existingIndex = existingList.find(key)
      existingList.removeAt(existingIndex)
      existingList.prepend(key, value)
    } else {
      // if there is a collision (two different key get same hash code), add to linked list
      existingList.prepend(key, value)
      this.size++
    }
    // grow bucket size based on load factor
    if (this.isLoadFactorExceeded()) {
      this.growBucket()
    }
  }

  get(key) {
    // return value assigned to this key. If key not found, return null
    const index = this.hash(key) % this.bucketSize
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound")
    }
    const list = this.buckets[index]
    if (!list) {
      return null
    }
    const nodeIndex = list.find(key)
    if (nodeIndex == null) {
      return null
    }
    return list.at(nodeIndex)?.value
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
    // if given key is in hash map, remove the entry with that key and return true
    // if key isn't in the hash map, it should return false
    if (this.size === 0) {
      return false
    }
    const index = this.hash(key) % this.bucketSize
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound")
    }
    const list = this.buckets[index]
    if (!list) {
      return false
    }
    const keyIndex = list.find(key)
    return list.removeAt(keyIndex) != null
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
    // return an array containing all the values
    const output = []
    for (const list of this.buckets) {
      if (list == null) {
        continue
      }
      const size = list.size
      for (let i = 0; i < size; i++) {
        output.push(list.at(i).value)
      }
    }
    return output
  }

  entries() {
    // return array that contain each key, value pair
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
    if (this.size === 0) {
      return []
    }
    const output = []
    for (const list of this.buckets) {
      if (list == null) {
        continue
      }
      const size = list.size
      for (let i = 0; i < size; i++) {
        const item = list.at(i)
        output.push([item.key, item.value])
      }
    }
    return output
  }
}
