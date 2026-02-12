export function displayWinner(winnerName, winnerGridsHits, loserGridsHits)
{
    const winnerDialog = document.querySelector("#game-winner");
    const winnerMessage = document.querySelector("#game-winner p");
    const playerHitDisplay = document.querySelector("#player-hits");
    const computerHitDisplay = document.querySelector("#computer-hits");


    winnerDialog.showModal();
    winnerMessage.textContent = winnerName + " won the game!";
    playerHitDisplay.textContent = "Player hits connected: " + loserGridsHits;
    computerHitDisplay.textContent = "Computer hits connected: " + winnerGridsHits;
}