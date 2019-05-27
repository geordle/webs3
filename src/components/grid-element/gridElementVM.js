import field from "../../domain/field";


export class GridElementVM {
    constructor({ x, y, name }) {
        this._x = x;
        this._y = y;
        this._regionName = name;
    }

    
    get isRock(){
        return field
            .find(value => value.name === this._regionName)
            .grid
            .find(row => row.name === this._x)
            .Columns[this._y] === "1";
    }

    onElementDropped(par){
        console.log(JSON.parse(par.dataTransfer.getData('monsterConfigurator')));

    }
}
