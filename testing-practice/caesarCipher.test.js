import caesarCipher from "./caesarCipher"

// takes a string and a shift factor and returns it with each character "shifted"
describe("caesarCipher", () => {
  test("to be defined", () => {
    expect(caesarCipher).toBeDefined()
  })

  test("undefined or null value returns null", () => {
    expect(caesarCipher()).toBeNull()
  })

  test("empty string returns empty string", () => {
    expect(caesarCipher("")).toBe("")
  })

  test("shift factor of zero returns same string", () => {
    expect(caesarCipher("a", 0)).toBe("a")
    expect(caesarCipher("z", 0)).toBe("z")
  })

  test("single lowercase letter", () => {
    expect(caesarCipher("a", 25)).toBe("z")
    expect(caesarCipher("a", 1)).toBe("b")
    expect(caesarCipher("a", 3)).toBe("d")
    expect(caesarCipher("b", 3)).toBe("e")
    expect(caesarCipher("z", 25)).toBe("y")
    expect(caesarCipher("z", 1)).toBe("a")
  })

  test("multiple letters", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc")
  })

  test("preserve letter case", () => {
    expect(caesarCipher("HeLLo", 3)).toBe("KhOOr")
  })

  test("preserve punctuation", () => {
    expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!")
  })
})
