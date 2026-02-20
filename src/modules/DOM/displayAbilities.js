export function displayAbilities()
{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section)=>{
        section.classList.add("game");
    })
}