import analyzeArray from "./analyzeArray"

// takes an array of numbers and returns an object with the following properties: `average`, `min`, `max`, and `length`
describe("analyzeArray", () => {
  test("to be defined", () => {
    expect(analyzeArray).toBeDefined()
  })

  test("null or undefined returns empty object", () => {
    expect(analyzeArray()).toEqual({})
    expect(analyzeArray(null)).toEqual({})
  })

  test("empty list of numbers returns zero for all properties", () => {
    expect(analyzeArray([])).toEqual({
      average: 0,
      min: 0,
      max: 0,
      length: 0,
    })
  })

  test("one number returns property based on that number", () => {
    expect(analyzeArray([4])).toEqual({
      average: 4,
      min: 4,
      max: 4,
      length: 1,
    })
  })

  test("multiple numbers", () => {
    expect(analyzeArray([4, 3, 2])).toEqual({
      average: 3,
      min: 2,
      max: 4,
      length: 3,
    })
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    })
  })
})
