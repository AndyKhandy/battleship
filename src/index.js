import "./style.css";
import Ship from "./modules/CLASSES/ship";
import Gameboard from "./modules/CLASSES/gameboard";
import Player from "./modules/CLASSES/player";
import createBoard from "./modules/DOM/createBoard";

const player = new Player(false);
const computer = new Player(true);

let currentPlayer = player;

createBoard(player.isComputer, attackFunction);
createBoard(computer.isComputer, attackFunction);

function attackFunction([x,y], div)
{
    if((div.classList.contains("player") && currentPlayer != player) || (div.classList.contains("computer") && currentPlayer != computer))
    {
        div.classList.add("hit");
        div.style.backgroundColor = "black";
        currentPlayer = currentPlayer == player ? computer : player;
    }
}