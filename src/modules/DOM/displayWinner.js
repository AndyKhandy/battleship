const winnerDialog = document.querySelector("#game-winner");
const winnerMessage = document.querySelector("#game-winner h1");
const winnerHitDisplay = document.querySelector("#winner-hits");
const winnerMissDisplay = document.querySelector("#winner-miss");
const loserHitDisplay = document.querySelector("#loser-hits"); 
const loserMissDisplay = document.querySelector("#loser-miss"); 


export function displayWinner(winningPlayer, losingPlayer) {
  winnerDialog.showModal();
  let winner = winningPlayer.name;
  let loser = losingPlayer.name;
  if(winner == "fire-nation")
  {
    fireNationWin();
  }
  else{
    waterTribeWin();
  }
  winnerHitDisplay.textContent = `${winner} hits connected: ${losingPlayer.shipGridsHit}`;
  loserHitDisplay.textContent =`${loser} hits connected: ${winningPlayer.shipGridsHit}`;
  winnerMissDisplay.textContent = `${winner} missed on: ${winningPlayer.numMissedShots} grids`;
  loserMissDisplay.textContent = `${loser} missed on: ${losingPlayer.numMissedShots} grids`;
  
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