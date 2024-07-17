import HashMap from "./hashmap.js"

// Testing hash map
// 2) Create a new instance of your hash map and set the load factor to be 0.75
const test = new HashMap()
// 3) Populate your hash map using the set(key, value) method
test.set("apple", "red")
test.set("banana", "yellow")
test.set("carrot", "orange")
test.set("dog", "brown")
test.set("elephant", "gray")
test.set("frog", "green")
test.set("grape", "purple")
test.set("hat", "black")
test.set("ice cream", "white")
test.set("jacket", "blue")
test.set("kite", "pink")
test.set("lion", "golden")

// 4) After populating your hash map with the data above, your hash map’s actual capacity
// should now be at 0.75 (full capacity)
console.log(test.bucketSize)

// 5) Now with a full hash map, try overwriting a few nodes using set(key, value).
// By right, this should only over-write the existing values of your nodes and not add new ones
test.set("lion", "grey")
console.log(test.get("lion"))
console.log(test.bucketSize)
console.log(test)

// 6) After that, populate your hash map with the last node below (doing this will make your hash map
// exceed your current load factor, hence expanding your buckets and growing your hash map):
test.set("moon", "silver")

// 7) If you have implemented your hash map correctly, the capacity of your new hash map will drop well below
// your load factor and you will notice that the nodes in your hash map are spread much evenly among your buckets
console.log("Step 7")
console.log(test)

// 8) With your new hash map, try overwriting a few nodes using set(key, value).
// Again, this should only over-write existing values of your nodes.
console.log(test.get("moon"))
test.set("moon", "white")
console.log(test.get("moon"))
