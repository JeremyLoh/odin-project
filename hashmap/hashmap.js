export default class HashMap {
  constructor() {}

  hash(key) {
    // TODO take a key and produce a hash code
  }

  set(key, value) {
    // TODO if key exists, then old value is overriden
    // if there is a collision (two different key get same hash code), add to linked list
    // TODO grow bucket size based on load factor
  }

  get(key) {
    // TODO return value assigned to this key. If key not found, return null
  }

  has(key) {
    // TODO take a key and return true or false based on whether key is in the hash map
  }

  remove(key) {
    // TODO if given key is in hash map, remove the entry with that key and return true
    // if key isn't in the hash map, it should return false
  }

  length() {
    // TODO return the number of stored keys in the hash map
  }

  clear() {
    // TODO removes all entries in the hash map
  }

  keys() {
    // TODO return an array containing all the keys inside the hash map
  }

  values() {
    // TODO return an array containing all the values
  }

  entries() {
    // TODO return array that contain each key, value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  }
}
