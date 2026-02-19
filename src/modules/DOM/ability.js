export function changeAbilityBtnOpacity(abilityBtn,missedShots)
{
    let opacity = (70 + ((missedShots % 4)*10))/100;
    abilityBtn.style.opacity = opacity;
}