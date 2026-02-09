import "./style.css";
import "./modules/CLASSES/ship";
import "./modules/CLASSES/gameboard";
import Player from "./modules/CLASSES/player";
import createBoard from "./modules/DOM/createBoard";
import renderAttack from "./modules/DOM/renderAttack";
import renderSunkShip from "./modules/DOM/renderSunkShip";

const player = new Player("player", false);
const computer = new Player("computer", true);
player.gameboard.randomizeBoard();
computer.gameboard.randomizeBoard();

let gameOver = false;
let currentPlayer = player;

createBoard(player, attackFunction);
createBoard(computer, attackFunction);

function attackFunction([x, y], div) {
  if (!validMove(div)) {
    return;
  }
  let attackActivated = currentPlayer.gameboard.receiveAttack([x, y]);

  if (attackActivated) {
    let shipSunkCoords = currentPlayer.gameboard.shipSunkAtCoords([x, y]);
    if (shipSunkCoords != null) {
      renderSunkShip(currentPlayer.name, shipSunkCoords);
      if (currentPlayer.gameboard.allSunk()) {
        switchPlayer();
        gameOver = true;
      }
    } else {
      renderAttack(currentPlayer, [x, y], div);
    }
    endPlayerTurn()
  }
  else{
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

function computerRandomMove() {
  if (computer.availableMoves.length === 0){
    return null;
  }
  const idx = Math.floor(Math.random() * computer.availableMoves.length);
  const move = computer.availableMoves[idx];
  computer.availableMoves.splice(idx, 1); 
  return move;
}

function computerAttack() {
  if (gameOver){
    return;
  }

  const move = computerRandomMove();
  let [xMove,yMove] = move;

  const playerGridDiv = document.querySelector(
    `.player[data-x="${xMove}"][data-y="${yMove}"]`
  );

  attackFunction([xMove, yMove], playerGridDiv);
}


function endPlayerTurn() {
  if (currentPlayer === computer && !gameOver) {
    setTimeout(computerAttack, 500); 
  }
}

function validMove(div) {
  if (
    !gameOver &&
    ((div.classList.contains(player.name) && currentPlayer == computer) ||
      (div.classList.contains(computer.name) && currentPlayer == player))
  ) {
    //if currentPlayer is computer changes the currentPlayer to player so that player recieves the attack
    //a weird pattern to think of but I believe it's more efficient than past implementation
    switchPlayer();
    return true;
  }
  return false;
}

function switchPlayer() {
  currentPlayer = currentPlayer == player ? computer : player;
}
