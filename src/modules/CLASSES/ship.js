export default class Ship
{
    constructor(length, shipName = "Destoryer"){
        this.shipName = shipName;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.coordinates = [];
    }

    hit()
    {
        this.hits++;
    }

    appendCoordinates(coordinate)
    {
        this.coordinates.push(coordinate);
    }

    isSunk()
    {
        return this.hits >= this.length;
    }
}