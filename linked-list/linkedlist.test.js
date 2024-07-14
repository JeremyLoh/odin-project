import { describe, expect, test } from "vitest"
import LinkedList from "./linkedlist"

describe("append()", () => {
  test("append item to empty linked list", () => {
    const expectedValue = 3
    const list = new LinkedList()
    expect(list.size).toBe(0)
    list.append(expectedValue)
    expect(list.size).toBe(1)
    expect(list.head.value).toBe(expectedValue)
    expect(list.tail.value).toBe(expectedValue)
  })

  test("append two items to empty linked list", () => {
    const firstExpectedValue = 1
    const secondExpectedValue = "two"
    const list = new LinkedList()
    list.append(firstExpectedValue)
    list.append(secondExpectedValue)
    expect(list.size).toBe(2)
    expect(list.head.value).toBe(firstExpectedValue)
    expect(list.tail.value).toBe(secondExpectedValue)
  })
})

describe("prepend()", () => {
  test("prepend one item to empty linked list", () => {
    const expectedValue = "testingPrependValue"
    const list = new LinkedList()
    list.prepend(expectedValue)
    expect(list.size).toBe(1)
    expect(list.head.value).toBe(expectedValue)
    expect(list.tail.value).toBe(expectedValue)
  })

  test("prepend two items to empty linked list", () => {
    const firstExpectedValue = 1
    const secondExpectedValue = "two"
    const list = new LinkedList()
    list.prepend(firstExpectedValue)
    list.prepend(secondExpectedValue)
    expect(list.size).toBe(2)
    expect(list.head.value).toBe(secondExpectedValue)
    expect(list.tail.value).toBe(firstExpectedValue)
  })
})

describe("at()", () => {
  test("get item at first index for empty linked list", () => {
    const list = new LinkedList()
    expect(list.at(0)).toBe(null)
  })

  test("get item at first index for one item linked list", () => {
    const expectedValue = 1
    const list = new LinkedList()
    list.append(expectedValue)
    expect(list.at(0).value).toBe(expectedValue)
  })

  test("get item at out of bounds index for two item linked list returns null", () => {
    const list = new LinkedList()
    list.append("first")
    list.append("second")
    expect(list.at(2)).toBe(null)
    expect(list.at(1).value).toBe("second")
    expect(list.at(0).value).toBe("first")
  })

  test("get item at negative index returns null", () => {
    const list = new LinkedList()
    expect(list.at(-1)).toBe(null)
    list.append("first")
    expect(list.at(-1)).toBe(null)
    expect(list.at(-2)).toBe(null)
  })
})
