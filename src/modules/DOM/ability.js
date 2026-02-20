export function changeAbilityBtn(abilityBtn,missedShotsLeft)
{
    //in case the user continues to click without using their water-ability ultimate
    if(missedShotsLeft <= 0)
    {
        abilityBtn.dataset.count = "";
        abilityBtn.style.setProperty("--opacity", 0);
    }
    else if(missedShotsLeft == 4)
    {
        abilityBtn.dataset.count = 4;
        abilityBtn.style.setProperty("--opacity", 0.5);
    }
    else{
        abilityBtn.dataset.count = missedShotsLeft;
    }
}



/*ABILITY HELP SECTION*/
const fireDescriptBtn = document.querySelector("#fire-ability-more");
const waterDescriptBtn = document.querySelector("#water-ability-more");
const closeDialog = document.querySelector("#close-ability-info");
const abilityDialog = document.querySelector("#ability-info");
const helpBtn = document.querySelector("#help-button");
const abilityHeadings = document.querySelectorAll(".heading");

abilityHeadings.forEach((heading)=>{
    heading.addEventListener("click",()=>{
        toggleInformation(heading.dataset.attribute);
    });
})

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