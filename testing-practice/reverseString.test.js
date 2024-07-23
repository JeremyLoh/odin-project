import reverseString from "./reverseString"

// takes a string and returns it reversed
describe("reverseString(value)", () => {
  test("function is defined", () => {
    expect(reverseString).toBeDefined()
  })

  test("undefined or null returns empty string", () => {
    expect(reverseString()).toBe("")
    expect(reverseString(null)).toBe("")
  })

  test("empty string returns empty string", () => {
    expect(reverseString("")).toBe("")
  })

  test("one letter string returns same letter", () => {
    expect(reverseString("a")).toBe("a")
  })

  test("multiple letter string returns reversed string", () => {
    expect(reverseString("abc")).toBe("cba")
  })

  test("multiple letter string with capital letters returns reversed string", () => {
    expect(reverseString("aBcDeFF")).toBe("FFeDcBa")
  })

  test("whitespace should still be present in reversed string", () => {
    expect(reverseString(" a b c ")).toBe(" c b a ")
  })

  test("numbers should still be present in reversed string", () => {
    expect(reverseString(" a123 b c ")).toBe(" c b 321a ")
  })

  test("multiple letter string with punctuation returns reversed string", () => {
    expect(reverseString("aB,.cDeFF")).toBe("FFeDc.,Ba")
  })

  test("multiple words string returns reversed string", () => {
    expect(reverseString("fiRst seconD THIRD")).toBe("DRIHT Dnoces tsRif")
  })
})
