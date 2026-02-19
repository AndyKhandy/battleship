export default async function moonlightAbility()
{
    const fireNationBoard = document.querySelector("#fire-nation-board");

    fireNationBoard.classList.add("active");

    await new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("done");
        },3000);
    });

    fireNationBoard.classList.remove("active");
}