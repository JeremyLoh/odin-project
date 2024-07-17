import { test, describe, expect } from "vitest"
import HashMap from "./hashmap"

describe("hash(key)", () => {
  test("should hash identical keys to same hash code", () => {
    const hashmap = new HashMap()
    const firstKey = "first23"
    const secondKey = "first23"
    const firstHashCode = hashmap.hash(firstKey)
    const secondHashCode = hashmap.hash(secondKey)
    expect(firstHashCode).to.be.finite
    expect(secondHashCode).to.be.finite
    expect(firstHashCode).toBe(secondHashCode)
  })

  test("should hash different keys to different hash code", () => {
    const hashmap = new HashMap()
    const firstKey = "first"
    const secondKey = "1tsrif"
    const firstHashCode = hashmap.hash(firstKey)
    const secondHashCode = hashmap.hash(secondKey)
    expect(firstHashCode).to.be.finite
    expect(secondHashCode).to.be.finite
    expect(firstHashCode).not.toBe(secondHashCode)
  })
})

describe("set(key, value)", () => {
  test("should add new item to empty hashmap", () => {
    const hashmap = new HashMap()
    expect(hashmap.length()).toBe(0)
    hashmap.set("firstKey", "firstValue")
    expect(hashmap.length()).toBe(1)
    expect(hashmap.get("firstKey")).toBe("firstValue")
  })

  test("should override same key", () => {
    const hashmap = new HashMap()
    expect(hashmap.length()).toBe(0)
    hashmap.set("firstKey", "firstValue")
    expect(hashmap.get("firstKey")).toBe("firstValue")
    hashmap.set("firstKey", "override value")
    expect(hashmap.get("firstKey")).toBe("override value")
    expect(hashmap.length()).toBe(1)
  })

  test("should add two unique keys", () => {
    const hashmap = new HashMap()
    expect(hashmap.length()).toBe(0)
    hashmap.set("firstKey", "first value")
    hashmap.set("secondKey", "second value")
    expect(hashmap.length()).toBe(2)
    expect(hashmap.get("firstKey")).toBe("first value")
    expect(hashmap.get("secondKey")).toBe("second value")
  })
})

describe("clear()", () => {
  test("should clear empty hashmap", () => {
    const hashmap = new HashMap()
    expect(hashmap.length()).toBe(0)
    hashmap.clear()
    expect(hashmap.length()).toBe(0)
  })

  test("clear one key", () => {
    const hashmap = new HashMap()
    hashmap.set("first", "123")
    expect(hashmap.length()).toBe(1)
    hashmap.clear()
    expect(hashmap.length()).toBe(0)
    expect(hashmap.get("first")).toBe(null)
  })

  test("clear two keys", () => {
    const hashmap = new HashMap()
    hashmap.set("first", "123")
    hashmap.set("second", "2")
    expect(hashmap.length()).toBe(2)
    hashmap.clear()
    expect(hashmap.length()).toBe(0)
    expect(hashmap.get("first")).toBe(null)
    expect(hashmap.get("second")).toBe(null)
  })
})

describe("keys()", () => {
  test("empty hashmap returns zero keys", () => {
    const hashmap = new HashMap()
    expect(hashmap.keys()).toEqual([])
  })

  test("one item", () => {
    const hashmap = new HashMap()
    hashmap.set("firstKey", "firstValue")
    expect(hashmap.keys()).to.have.deep.members(["firstKey"])
  })

  test("two items", () => {
    const hashmap = new HashMap()
    hashmap.set("firstKey", "firstValue")
    hashmap.set("secondKey", "secondValue")
    expect(hashmap.keys()).to.have.deep.members(["firstKey", "secondKey"])
  })

  test("multiple items", () => {
    // ensure some bucket has more than one item: pigeonhole principle
    const hashmap = new HashMap()
    hashmap.set("firstKey", "1")
    hashmap.set("secondKey", "2")
    hashmap.set("thirdKey", "3")
    hashmap.set("fourthKey", "4")
    hashmap.set("fifthKey", "5")
    hashmap.set("sixthKey", "6")
    hashmap.set("sevenKey", "7")
    hashmap.set("eightKey", "8")
    hashmap.set("ninthKey", "9")
    hashmap.set("tenKey", "10")
    hashmap.set("11Key", "11")
    hashmap.set("12Key", "12")
    hashmap.set("13Key", "13")
    hashmap.set("14Key", "14")
    hashmap.set("15Key", "15")
    hashmap.set("16Key", "16")
    expect(hashmap.keys()).to.have.deep.members([
      "firstKey",
      "secondKey",
      "thirdKey",
      "fourthKey",
      "fifthKey",
      "sixthKey",
      "sevenKey",
      "eightKey",
      "ninthKey",
      "tenKey",
      "11Key",
      "12Key",
      "13Key",
      "14Key",
      "15Key",
      "16Key",
    ])
    expect(hashmap.keys().length).toBe(16)
  })
})
