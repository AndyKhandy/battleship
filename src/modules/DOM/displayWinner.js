const winnerDialog = document.querySelector("#game-winner");
const winnerMessage = document.querySelector("#game-winner h1");
const playerHitDisplay = document.querySelector("#player-hits");
const computerHitDisplay = document.querySelector("#computer-hits");


export function displayWinner(winnerName, winnerGridsHits, loserGridsHits) {
  winnerDialog.showModal();
  if(winnerName == "fire-nation")
  {
    fireNationWin();
  }
  else{
    waterTribeWin();
  }
  playerHitDisplay.textContent = "Player hits connected: " + loserGridsHits;
  computerHitDisplay.textContent =
    "Computer hits connected: " + winnerGridsHits;
}

function fireNationWin()
{
    winnerMessage.textContent = "DEFEAT!";
    winnerMessage.classList.add("lost");
    winnerDialog.classList.add("fire");
}

function waterTribeWin()
{
    winnerMessage.textContent = "VICTORY!";
    winnerMessage.classList.add("won");

}