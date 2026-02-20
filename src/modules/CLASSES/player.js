import Gameboard from "./gameboard";

export default class Player {
  constructor(name, ability="Moonlight's Shimmer") {
    this.gameboard = new Gameboard();
    this.name = name;
    this.shipGridsHit = 0;
    this.numMissedShots = 0;
    this.abilityName = ability;
    this.missedShotsCooldown = 4;
  }

  shipSquareHit()
  {
    this.shipGridsHit++;
  }

  canUseAbility()
  {
    return this.missedShotsCooldown == 0;
  }

}
