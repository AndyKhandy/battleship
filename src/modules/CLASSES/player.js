import Gameboard from "./gameboard";

export default class Player {
  constructor(isComputer) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }
}
