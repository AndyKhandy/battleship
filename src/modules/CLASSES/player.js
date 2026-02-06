import Gameboard from "./gameboard";

export default class Player {
  constructor(name) {
    this.gameboard = new Gameboard();
    this.name = name;
  }
}
