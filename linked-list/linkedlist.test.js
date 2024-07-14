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

describe("pop()", () => {
  test("empty linked list returns null", () => {
    const list = new LinkedList()
    expect(list.pop()).toBe(null)
  })

  test("one item linked list returns item", () => {
    const expectedValue = "first"
    const list = new LinkedList()
    list.append(expectedValue)
    expect(list.size).toBe(1)
    const lastNode = list.pop()
    expect(lastNode.value).toBe(expectedValue)
    expect(list.size).toBe(0)
  })

  test("two item linked list updates tail", () => {
    const firstExpectedValue = "first"
    const secondExpectedValue = "second"
    const list = new LinkedList()
    list.append(firstExpectedValue)
    list.append(secondExpectedValue)

    expect(list.pop().value).toBe(secondExpectedValue)
    expect(list.tail.value).toBe(firstExpectedValue)
    expect(list.head.value).toBe(firstExpectedValue)

    expect(list.pop().value).toBe(firstExpectedValue)
    expect(list.tail).toBe(null)
    expect(list.head).toBe(null)
  })

  test("three item linked list updates tail", () => {
    const firstExpectedValue = "first"
    const secondExpectedValue = "second"
    const thirdExpectedValue = "third"
    const list = new LinkedList()
    list.append(firstExpectedValue)
    list.append(secondExpectedValue)
    list.append(thirdExpectedValue)

    expect(list.pop().value).toBe(thirdExpectedValue)
    expect(list.pop().value).toBe(secondExpectedValue)
    expect(list.pop().value).toBe(firstExpectedValue)
    expect(list.pop()).toBe(null)
  })
})

describe("contains()", () => {
  test("empty list", () => {
    const list = new LinkedList()
    expect(list.contains(null)).toBe(false)
  })

  test("one item", () => {
    const list = new LinkedList()
    expect(list.contains("first")).toBe(false)
    list.append("first")
    expect(list.contains("first")).toBe(true)
    expect(list.contains(null)).toBe(false)
  })

  test("two items", () => {
    const list = new LinkedList()
    expect(list.contains("first")).toBe(false)
    expect(list.contains("second")).toBe(false)
    expect(list.contains(null)).toBe(false)
    list.append("first")
    list.append("second")
    list.append(null)
    expect(list.contains("first")).toBe(true)
    expect(list.contains("second")).toBe(true)
    expect(list.contains(null)).toBe(true)
  })
})
