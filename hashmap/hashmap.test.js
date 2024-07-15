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
    const secondKey = "tsrif"
    const firstHashCode = hashmap.hash(firstKey)
    const secondHashCode = hashmap.hash(secondKey)
    expect(firstHashCode).to.be.finite
    expect(secondHashCode).to.be.finite
    expect(firstHashCode).not.toBe(secondHashCode)
  })
})
