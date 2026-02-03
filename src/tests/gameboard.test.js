import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

let playerBoard;

beforeEach(() => {
  playerBoard = new Gameboard();
});

describe("test recieveAttack on properties and methods", () => {
  test("Attack [0,0] (null value) will add a value to missedShots", () => {
    playerBoard.receiveAttack([0, 0]);
    expect(playerBoard.missedShots.size).toBe(1);
  });

  describe("test recieveAttack on coordinate object that has not been hit yet", () => {
    beforeEach(() => {
      let ship = new Ship(1);
      playerBoard.ships.push(ship);
      playerBoard.board[0][0] = {
        ship,
        alreadyHit: false,
      };
      playerBoard.receiveAttack([0, 0]);
    });

    test("Attack [0,0] (Ship) will not add a value to missedShots", () => {
      expect(playerBoard.missedShots.size).toBe(0);
    });

    test("Attack [0,0] (Ship) will change alreadyHit to true for that coordinate object", () => {
      expect(playerBoard.board[0][0].alreadyHit).toBeTruthy();
    });

    test("Attack [0,0] (Ship) will change hits count on the ship object of the coordinate object", () => {
      expect(playerBoard.board[0][0].ship.hits).toBe(1);
    });

    test("allSunk() returns true for 1 total ship of length 1 being sunk", () => {
      expect(playerBoard.allSunk()).toBeTruthy();
    });
  });

  describe("test recieveAttack on coordinate object that have been hit already", () => {
    beforeEach(() => {
      playerBoard.board[0][0] = {
        ship: new Ship(1),
        alreadyHit: false,
      };
      playerBoard.receiveAttack([0, 0]);
    });

    test("Attack [0,0] (Ship) will not change hits count on the ship object if it has been hit already", () => {
      playerBoard.receiveAttack([0, 0]);
      expect(playerBoard.board[0][0].ship.hits).toBe(1);
    });
  });
});
