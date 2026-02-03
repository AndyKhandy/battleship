
export default function createBoard(isComputer, attackFunction)
{
    let DOMboard = isComputer ? "computer" : "player";
    let board = document.querySelector(`#${DOMboard}-board`);

    for(let x = 0; x < 10; x++)
    {
        for(let y = 0; y < 10; y++)
        {
            let coordinateDiv = document.createElement("div");
            coordinateDiv.dataset.x = x;
            coordinateDiv.dataset.y = y;
            coordinateDiv.classList.add(DOMboard);

            coordinateDiv.addEventListener("click", ()=>{
                //send the div reference to send to another DOM function to change
                //the appearance ie miss or hit
                attackFunction([x,y], coordinateDiv);
            });
            
            board.append(coordinateDiv);
        }
    }
} 