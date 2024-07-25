import Gameboard from "./gameboard"

/*
2. Create a `Gameboard` class/factory
   1. Note that we have not yet created any User interface. We should know our code is coming together by running the tests. You shouldn't be relying on `console.log` or DOM methods to make sure your code is doing what you expect it to
   2. Gameboard should be able to place ships at specific coordinates by calling the ship factory or class
   3. Gameboards should have a `receiveAttack` function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the "hit" function to the correct ship, or records the coordinates of the missed shot
   4. Gameboards should keep track of missed attacks so they can display them properly
   5. Gameboards should be able to report whether or not all of their ships have been sunk
*/
describe("gameboard", () => {
  test("is defined", () => {
    const gameboard = new Gameboard()
    expect(gameboard).toBeDefined()
  })

  describe("place ship at specific coordinates", () => {
    test("place horizontal ship at coordinate within board should not throw error", () => {
      const gameboard = new Gameboard(10, 10)
      const shipSize = 3
      expect(() =>
        gameboard.placeHorizontalShip([0, 0], shipSize)
      ).not.toThrow()
    })

    test("place horizontal ship at coordinate outside board throws error", () => {
      const gameboard = new Gameboard(10, 10)
      const shipSize = 3
      const expectedErrorMessage =
        "Invalid coordinate to place ship as coordinate is outside board"
      expect(() => gameboard.placeHorizontalShip([10, 9], shipSize)).toThrow(
        expectedErrorMessage
      )
      expect(() => gameboard.placeHorizontalShip([9, 10], shipSize)).toThrow(
        expectedErrorMessage
      )
      expect(() => gameboard.placeHorizontalShip([10, 10], shipSize)).toThrow(
        expectedErrorMessage
      )
      expect(() => gameboard.placeHorizontalShip([-1, 3], shipSize)).toThrow(
        expectedErrorMessage
      )
      expect(() => gameboard.placeHorizontalShip([0, -1], shipSize)).toThrow(
        expectedErrorMessage
      )
      expect(() => gameboard.placeHorizontalShip([-1, -1], shipSize)).toThrow(
        expectedErrorMessage
      )
    })

    test("place horizontal ship at coordinate where ship length causes ship to be outside board returns error", () => {
      const gameboard = new Gameboard(10, 10)
      const shipSize = 3
      const expectedErrorMessage =
        "Invalid coordinate to place ship due to ship size"
      expect(() => gameboard.placeHorizontalShip([8, 0], shipSize)).toThrow(
        expectedErrorMessage
      )
    })

    test("place horizontal ship at coordinate where ship is within board should not return error", () => {
      const gameboard = new Gameboard(10, 10)
      const shipSize = 3
      expect(() =>
        gameboard.placeHorizontalShip([7, 0], shipSize)
      ).not.toThrow()
      expect(() =>
        gameboard.placeHorizontalShip([7, 9], shipSize)
      ).not.toThrow()
      expect(() =>
        gameboard.placeHorizontalShip([0, 0], shipSize)
      ).not.toThrow()
    })
  })
})
