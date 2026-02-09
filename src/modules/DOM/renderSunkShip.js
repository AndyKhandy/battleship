export default function renderSunkShip(currentBoardName,coordinates)
{
    for(let [x,y] of coordinates)
    {
        let attackedGrid = document.querySelector(`.${currentBoardName}[data-x="${x}"][data-y="${y}"]`);
        attackedGrid.classList.remove("hit");
        attackedGrid.classList.remove("no-hit");
        attackedGrid.classList.add("sunk");
    }
}