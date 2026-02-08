import Ship from "./ship";

const SHIPS = [
  {
    length: 5,
    name: "Carrier",
  },
  {
    length: 4,
    name: "Battleship",
  },
  {
    length: 3,
    name: "Cruiser",
  },
  {
    length: 3,
    name: "Submarine",
  },
  {
    length: 2,
    name: "Destroyer",
  },
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
      return null;
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
        if (this.board[x][y].ship.isSunk()) {
          return this.board[x][y].ship.coordinates;
        }
      }
      return null;
    }
  }

  randomizeBoard() {
    for (let shipObj of SHIPS) {
      let shipLength = shipObj.length;
      let shipName = shipObj.name;

      while (true) {
        let direction = Math.random() < 0.5 ? "Horizontal" : "Vertical";
        let xStart = Math.floor(Math.random() * 10);
        let yStart = Math.floor(Math.random() * 10);
        if (this.validShipLocation(xStart, yStart, shipLength, direction)) {
          let newlyMadeShip = new Ship(shipLength, shipName);
          if (direction == "Horizontal") {
            for (
              let xPosition = xStart;
              xPosition < xStart + shipLength;
              xPosition++
            ) {
              this.board[xPosition][yStart] = {
                ship: newlyMadeShip,
                alreadyHit: false,
              };
              newlyMadeShip.appendCoordinates([xPosition, yStart]);
            }
          } else {
            for (
              let yPosition = yStart;
              yPosition < yStart + shipLength;
              yPosition++
            ) {
              this.board[xStart][yPosition] = {
                ship: newlyMadeShip,
                alreadyHit: false,
              };
              newlyMadeShip.appendCoordinates([xStart, yPosition]);
            }
          }
          this.ships.push(newlyMadeShip);
          break;
        }
      }
    }
  }

  validShipLocation(xStart, yStart, length, direction) {
    //used AI to understand logic behind how to check surroundings
    //of battleship so that ships aren't clumped together or near each other
    const checkSurroundings = (x, y) => {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (this.board[nx][ny]) return false;
          }
        }
      }
      return true;
    };

    if (direction === "Horizontal" && xStart + length < 10) {
      for (let x = xStart; x < xStart + length; x++) {
        if (!checkSurroundings(x, yStart)) return false;
      }
      return true;
    } else if (direction === "Vertical" && yStart + length < 10) {
      for (let y = yStart; y < yStart + length; y++) {
        if (!checkSurroundings(xStart, y)) return false;
      }
      return true;
    }

    return false;
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
