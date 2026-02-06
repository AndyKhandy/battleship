export default function renderAttack(player,[x,y],div)
{
    let missedShots = player.gameboard.missedShots;
    if(missedShots.has(`${x},${y}`))
    {
        div.classList.add("miss");
    }
    else{
        div.classList.add("hit");
    }
    div.classList.remove("no-hit");
}