export function changeAbilityBtnOpacity(abilityBtn,missedShots)
{
    let opacity = (70 + ((missedShots % 4)*10))/100;
    abilityBtn.style.opacity = opacity;
}

const fireDescriptBtn = document.querySelector("#fire-ability-more");
const waterDescriptBtn = document.querySelector("#water-ability-more");
const closeDialog = document.querySelector("#close-ability-info");
const abilityDialog = document.querySelector("#ability-info");
const helpBtn = document.querySelector("#help-button");

helpBtn.addEventListener("click",()=>{
    abilityDialog.showModal();
})

fireDescriptBtn.addEventListener("click",()=>{
    toggleInformation("fire");
});

waterDescriptBtn.addEventListener("click",()=>{
    toggleInformation("water");
});

function toggleInformation(abilityType)
{
    const description = document.querySelector(`#${abilityType}-description`);

    description.classList.toggle("open");
}

closeDialog.addEventListener("click",()=>{
    abilityDialog.close();
})