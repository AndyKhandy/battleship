const textHolder = document.querySelector(".log-attack p");

let text = "";
let i = 0;

export default async function displayLogMessage(currentPlayer, hitShip, sunkShip, [x,y])
{
     i = 0;
    text = "";
    //ensures that the coordinates are not in index
    x++;
    y++;
    textHolder.textContent = "";
    if(!hitShip)
    {
        text = `${currentPlayer} has missed at [${x},${y}]`;
    }
    else
    {
        if(!sunkShip)
        {
            text = `${currentPlayer} has hit a ship at [${x},${y}]`;
        }
        else{
            text = `${currentPlayer} has sunk a ship at [${x},${y}]`;
        }
    }
    text+=" ...";
    await typeWritter();
}

//used w3school to learn how to implement flowly text
function typeWritter() {
  return new Promise((resolve) => {
    i = 0; // reset counter

    function typeChar() {
      if (i < text.length) {
        textHolder.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 30);
      } else {
        resolve();
      }
    }

    typeChar();
  });
}
