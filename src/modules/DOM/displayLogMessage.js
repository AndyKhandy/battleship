const textHolder = document.querySelector(".log-attack p");

let text = "";
let i = 0;

export default async function displayLogMessage(currentPlayerName, hitShip, sunkShip, [x,y], abilityName = "")
{
     i = 0;
    text = "";
    //ensures that the coordinates are not in index
    x++;
    y++;
    textHolder.textContent = "";

    if(abilityName)
    {
      text = `${currentPlayerName} is using their ultimate
      ability: ${abilityName}`;
    }
    else{
      if(!hitShip)
    {
        text = `${currentPlayerName} has missed at [${x},${y}]`;
    }
    else
    {
        if(!sunkShip)
        {
            text = `${currentPlayerName} has hit a ship at [${x},${y}]`;
        }
        else{
            text = `${currentPlayerName} has sunk a ship at [${x},${y}]`;
        }
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
