import Ship from "../modules/CLASSES/ship";

let newShip;

describe("Testing lengths of ship", () => {

  test("Create a ship of length 5", () => {
    newShip = new Ship(5);
    expect(newShip.length).toBe(5);
  });

});

describe("Testing functions of ship", () => {
  beforeEach(() => {
    newShip = new Ship(1);
  });

  test("Hits changes with the function hit()", () => {
    newShip.hit();
    expect(newShip.hits).toBe(1);
  });

  test("tests isSunk() on a 1 length ship that is hit", () => {
    newShip.hit();
    expect(newShip.isSunk()).toBeTruthy();
  });
});
