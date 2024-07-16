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
