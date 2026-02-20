import "./style.css";
import "./modules/CLASSES/ship";
import "./modules/CLASSES/gameboard";
import Player from "./modules/CLASSES/player";
import createBoard from "./modules/DOM/createBoard";
import renderAttack from "./modules/DOM/renderAttack";
import renderSunkShip from "./modules/DOM/renderSunkShip";
import { displayWinner } from "./modules/DOM/displayWinner";
import { displayAbilities } from "./modules/DOM/displayAbilities";
import displayLogMessage from "./modules/DOM/displayLogMessage";
import { changeAbilityBtn } from "./modules/DOM/ability";
import moonlightAbility from "./modules/DOM/moonlightAbility";

const randomizeBtn = document.querySelector("#randomize-board");
const startBtn = document.querySelector("#start-game");
const startButtons = document.querySelector(".start-buttons");
const log = document.querySelector(".log-attack");
const moonlightAbilityBtn = document.querySelector("#water-ability");
const cometAbilityBtn = document.querySelector("#fire-ability");

const player = new Player("water-tribe");
const computer = new Player("fire-nation", "Sozin's Comet");

let gameOver = false;
let gameStart = false;
let currentPlayer = player;
//ensure that the triple attack doesn't lower cooldown
let cometAbility = false;

displayRandomizeBoard(player);
displayRandomizeBoard(computer);

randomizeBtn.addEventListener("click", () => {
  player.gameboard.resetBoard();
  displayRandomizeBoard(player);
});

startBtn.addEventListener("click", () => {
  startButtons.classList.add("hide");
  log.classList.add("show");
  displayAbilities();
  gameStart = true;
});

moonlightAbilityBtn.addEventListener("click", (e) => {
  useAbility(player, e.target);
});

function displayRandomizeBoard(playerObject) {
  playerObject.gameboard.randomizeBoard();
  createBoard(playerObject, attackFunction);
}

function useAbility(attacker, button) {
  if (attacker == currentPlayer && attacker.canUseAbility()) {
    activateAbility(attacker.name, attacker.abilityName);
    attacker.missedShotsCooldown = 4;
    changeAbilityBtn(button, 4);
    return true;
  }
  return false;
}

async function activateAbility(attackerName, abilityName) {
  await displayLogMessage(attackerName, false, false, [0, 0], abilityName);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, 1000);
  });

  if (abilityName == "Moonlight's Shimmer") {
    await moonlightAbility();
  } else {
    await sozinComet();
  }
}

async function attackFunction([x, y], div) {
  let attacker = currentPlayer.name == "water-tribe" ? player : computer;
  if (!validMove(div)) {
    return;
  }
  let attackActivated = currentPlayer.gameboard.receiveAttack([x, y]);

  if (attackActivated) {
    renderAttack(currentPlayer, [x, y], div);
    if (currentPlayer.gameboard.isShip([x, y])) {
      currentPlayer.shipSquareHit();
      let shipSunkCoords = currentPlayer.gameboard.shipSunkAtCoords([x, y]);
      if (shipSunkCoords != null) {
        renderSunkShip(currentPlayer.name, shipSunkCoords);
        await displayLogMessage(attacker, true, true, [x, y]);
        checkWinner();
      } else {
        await displayLogMessage(attacker.name, true, false, [x, y]);
      }
    } else {
      let button = getButtonName(attacker.name);
      let opacity = window.getComputedStyle(button).getPropertyValue("--opacity");
      attacker.numMissedShots++;
      if(!cometAbility)
      {
        attacker.missedShotsCooldown--;
      }

      if (opacity != 0) {
        changeAbilityBtn(button, attacker.missedShotsCooldown);
      }
      await displayLogMessage(attacker.name, false, false, [x, y]);
    }
    //give the type writter time to write out the full sentence

    await runComputerAttack();
  } else {
    //needed if the the player pressed on a grid that already was hit/missed on
    //allows player to try again
    switchPlayer();
  }
}

async function sozinComet() {
  cometAbility = true;
  //fire-nation fires 3 total times
  for (let i = 0; i < 2; i++) {
    await computerAttack();
    switchPlayer();
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, 1000);
    });
  }
  await computerAttack();
  //ensures that the missed shots from sozin's comet doesn't shorten the ability cooldown
  cometAbility = false;
  computer.missedShotsCooldown = 4;
  changeAbilityBtn(cometAbilityBtn,4);
}

function getButtonName(attackerName) {
  let buttonName = "";
  if (attackerName == "water-tribe") {
    buttonName = "water";
  } else {
    buttonName = "fire";
  }
  return document.querySelector(`#${buttonName}-ability`);
}

computer.availableMoves = [];
for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 10; y++) {
    computer.availableMoves.push([x, y]);
  }
}

//Gets a random coordinate and then removes it from availableMoves so that it can't be get again
function computerRandomMove() {
  if (computer.availableMoves.length === 0) {
    return null;
  }
  const idx = Math.floor(Math.random() * computer.availableMoves.length);
  const move = computer.availableMoves[idx];
  computer.availableMoves.splice(idx, 1);
  return move;
}

async function computerAttack() {
  if (gameOver) {
    return;
  }

  const move = computerRandomMove();
  let [xMove, yMove] = move;

  const playerGridDiv = document.querySelector(
    `.water-tribe[data-x="${xMove}"][data-y="${yMove}"]`,
  );

  await attackFunction([xMove, yMove], playerGridDiv);
}

async function runComputerAttack() {
  if (currentPlayer === computer && !gameOver) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!useAbility(computer, cometAbilityBtn)) {
      await computerAttack();
    }
  }
}

function validMove(div) {
  if (
    !gameOver &&
    ((div.classList.contains(player.name) && currentPlayer == computer) ||
      (div.classList.contains(computer.name) && currentPlayer == player)) &&
    gameStart
  ) {
    //if currentPlayer is computer changes the currentPlayer to player so that player recieves the attack
    //a weird pattern to think of but I believe it's more efficient than past implementation
    switchPlayer();
    return true;
  }
  return false;
}

function checkWinner() {
  if (currentPlayer.gameboard.allSunk()) {
    //switch player again to display correct winner
    //ex) sunk all ships on player-board (or currentPlayer.gameboard.board) which
    //means switchPlayer() so that the current player is computer
    switchPlayer();
    let otherPlayer = currentPlayer == player ? computer : player;

    //current player won the game
    displayWinner(
      currentPlayer,otherPlayer
    );
    gameOver = true;
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer == player ? computer : player;
}
