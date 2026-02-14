import "./style.css";
import "./modules/CLASSES/ship";
import "./modules/CLASSES/gameboard";
import Player from "./modules/CLASSES/player";
import createBoard from "./modules/DOM/createBoard";
import renderAttack from "./modules/DOM/renderAttack";
import renderSunkShip from "./modules/DOM/renderSunkShip";
import { displayWinner } from "./modules/DOM/displayWinner";
import { displayAbilities } from "./modules/CLASSES/displayAbilities";
import displayLogMessage from "./modules/DOM/displayLogMessage";

const randomizeBtn = document.querySelector("#randomize-board");
const startBtn = document.querySelector("#start-game");
const startButtons = document.querySelector(".start-buttons");
const log = document.querySelector(".log-attack")

const player = new Player("water-tribe", false);
const computer = new Player("fire-nation", true);

let gameOver = false;
let gameStart = false;
let currentPlayer = player;

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

function displayRandomizeBoard(playerObject) {
  playerObject.gameboard.randomizeBoard();
  createBoard(playerObject, attackFunction);
}

async function attackFunction([x, y], div) {
  let attacker = currentPlayer.name == "water-tribe"? "water-tribe" : "fire-nation";
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
        await displayLogMessage(attacker,true, true, [x,y]);
        checkWinner();
      }
      else{
       await displayLogMessage(attacker,true, false, [x,y]);
      }
    }
    else{
      await displayLogMessage(attacker,false, false, [x,y]);
    }
    //give the type writter time to write out the full sentence

    await runComputerAttack();
  } else {
    //needed if the the player pressed on a grid that already was hit/missed on
    //allows player to try again
    switchPlayer();
  }
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    await computerAttack();
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
    let otherShipsHit = currentPlayer == player ? computer.shipGridsHit : player.shipGridsHit;

    displayWinner(currentPlayer.name, currentPlayer.shipGridsHit, otherShipsHit);
    gameOver = true;
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer == player ? computer : player;
}
