import Gameboard from "./gameboard";

export default class Player {
  constructor(name) {
    this.gameboard = new Gameboard();
    this.name = name;
  }

  computerRandomMove() {
      let xAttack = Math.floor(Math.random() * 10);
      let yAttack = Math.floor(Math.random() * 10);
      return [xAttack,yAttack];
    }
}
