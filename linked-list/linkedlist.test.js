import { expect, test } from "vitest"
import LinkedList from "./linkedlist"

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
