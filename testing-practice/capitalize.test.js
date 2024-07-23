// Test "capitalize" function, takes a string and returns it with the first character capitalized
import capitalize from "./capitalize"

describe("capitalize", () => {
  test("function can be imported", () => {
    expect(capitalize).toBeDefined()
  })

  test("undefined or null returns empty string", () => {
    expect(capitalize(null)).toBe("")
    expect(capitalize()).toBe("")
  })

  test("empty string returns empty string", () => {
    expect(capitalize("")).toBe("")
  })

  test("whitespace returns whitespace", () => {
    expect(capitalize("   ")).toBe("   ")
  })

  test("one letter lowercase returns uppercase letter", () => {
    expect(capitalize("a")).toBe("A")
  })

  test("multiple letter returns uppercase for first letter", () => {
    expect(capitalize("abc")).toBe("Abc")
  })

  test("punctuation and whitespace are not affected", () => {
    expect(capitalize("a b c, . ")).toBe("A b c, . ")
  })

  test("whitespace at start should be ignored until first character is found", () => {
    expect(capitalize("   a b c ")).toBe("   A b c ")
  })

  test("punctuation at start should be ignored until first character is found", () => {
    expect(capitalize("   `~!@#$%^&*()-_=+{};:'\",<.>/?[]b c, . ")).toBe(
      "   `~!@#$%^&*()-_=+{};:'\",<.>/?[]B c, . "
    )
  })

  test("numbers at start should be ignored until first character is found", () => {
    expect(capitalize("12bc")).toBe("12Bc")
  })

  test("one digit number returns same number", () => {
    expect(capitalize("3")).toBe("3")
  })

  test("multiple digit number returns same number", () => {
    expect(capitalize("301")).toBe("301")
  })

  test("floating point number returns same number", () => {
    expect(capitalize("0.01")).toBe("0.01")
  })
})
