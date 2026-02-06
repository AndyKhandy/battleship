import "./style.css";
import Ship from "./modules/CLASSES/ship";
import "./modules/CLASSES/gameboard";
import Player from "./modules/CLASSES/player";
import createBoard from "./modules/DOM/createBoard";
import renderAttack from "./modules/DOM/renderAttack";

const player = new Player("player",false);
const computer = new Player("computer",true);

let currentPlayer = player;

createBoard(player.name, attackFunction);
createBoard(computer.name, attackFunction);

computer.gameboard.board[0][1] = {
    ship: new Ship(1),
    alreadyHit: false
}

function attackFunction([x,y], div)
{
    if(!validMove(div))
    {
        return false;
    }
    currentPlayer.gameboard.receiveAttack([x,y]);
    renderAttack(currentPlayer,[x,y],div);
}

function validMove(div)
{
    if((div.classList.contains(player.name) && currentPlayer == computer) || (div.classList.contains(computer.name) && currentPlayer == player))
    {
        //if currentPlayer is computer changes the currentPlayer to player so that player recieves the attack
        //a weird pattern to think of but I believe it's more efficient than past implementation
        switchPlayer();
        return true;
    }
    return false;
}

function switchPlayer()
{
    currentPlayer = currentPlayer == player ? computer : player;
}