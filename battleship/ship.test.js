import Ship from "./ship"

describe("ship", () => {
  test("is defined", () => {
    const ship = new Ship()
    expect(ship).toBeDefined()
  })

  describe("ship length", () => {
    test("get ship default length of one", () => {
      const ship = new Ship()
      expect(ship.length).toBe(1)
    })

    test("get ship length", () => {
      const ship = new Ship(5)
      expect(ship.length).toBe(5)
    })
  })

  describe("sunk", () => {
    test("should not be sunk when ship is created", () => {
      const ship = new Ship()
      expect(ship.isSunk()).toBe(false)
    })

    test("is not sunk when hit count is less than ship length", () => {
      const ship = new Ship(3)
      expect(ship.isSunk()).toBe(false)
      ship.hit()
      expect(ship.isSunk()).toBe(false)
      ship.hit()
      expect(ship.isSunk()).toBe(false)
    })

    test("is sunk when hit count is equal to ship length", () => {
      const ship = new Ship(2)
      ship.hit()
      ship.hit()
      expect(ship.isSunk()).toBe(true)
    })
  })

  describe("ship hit count", () => {
    test("zero times hit when ship is created", () => {
      const ship = new Ship()
      expect(ship.timesHit).toBe(0)
    })

    test("hit count increases by one when ship is hit", () => {
      const ship = new Ship()
      expect(ship.timesHit).toBe(0)
      ship.hit()
      expect(ship.timesHit).toBe(1)
    })
  })
})
