
export default function createBoard(playerObject, attackFunction)
{
    let board = document.querySelector(`#${playerObject.name}-board`);

    board.innerHTML = "";

    for(let x = 0; x < 10; x++)
    {
        for(let y = 0; y < 10; y++)
        {
            let coordinateDiv = document.createElement("div");
            coordinateDiv.dataset.x = x;
            coordinateDiv.dataset.y = y;
            coordinateDiv.classList.add(playerObject.name, "no-hit");
            if(playerObject.gameboard.board[x][y])
            {
                coordinateDiv.classList.add("visible");
            }
            coordinateDiv.textContent = "o";

            coordinateDiv.addEventListener("click", ()=>{
                //send the div reference to send to another DOM function to change
                //the appearance ie miss or hit
                attackFunction([x,y], coordinateDiv);
            });
            
            board.append(coordinateDiv);
        }
    }
} 