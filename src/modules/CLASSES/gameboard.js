import Ship from "./ship";
const SHIPS = [
      new Ship(5, "Carrier"),
      new Ship(4, "Battleship"),
      new Ship(3, "Cruiser"),
      new Ship(3, "Submarine"),
      new Ship(2, "Destroyer")
    ];

export default class Gameboard {

  constructor() {
    this.ships = [];
    this.missedShots = new Set();
    this.board = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
  }

  receiveAttack([x, y]) {
    let coordinates = `${x},${y}`;
    if (this.missedShots.has(coordinates) || this.board[x][y]?.alreadyHit) {
      return;
    } else {
      if (!this.board[x][y]) {
        this.missedShots.add(coordinates);
      } else {
        /*assume a coordinate with a ship would 
        have this structure 
      {
        ship: Ship(object),
        alreadyHit: false
      }
        */
        this.board[x][y].ship.hit();
        this.board[x][y].alreadyHit = true;
      }
    }
  }

  allSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
