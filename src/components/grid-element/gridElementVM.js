import field from "../../domain/field";
import { MonsterDao } from "../../domain/configurators/monsterDao";
import { MonsterBindable } from "../../domain/configurators/monsterBindable";
import { ViewModelLocator } from "../viewModelLocator";


export class GridElementVM extends MonsterBindable {
    constructor({ x, y, name }) {
        super();
        this._x = x;
        this._y = y;
        this._regionName = name;
        this.isDraggingOver = false;

        this._monster = MonsterDao.getInstance().getMonsterByLocation({ x, y, region: name }) || {};
        this.shouldPerformAction = false;
    }


    get containsMonster() {
        return this._monster.uuid;
    }

    get isRock() {
        return field
            .find(value => value.name === this._regionName)
            .grid
            .find(row => row.name === this._x)
            .Columns[this._y] === "1";
    }

    onDragOver(event) {
        if (!this.isRock) {
            event.preventDefault();
        }
    }

    onDragEnter(ev){
        if (!this.isRock) {
            this.isDraggingOver = true;
        }
    }
    onDragLeave(){
        this.isDraggingOver = false;
    }

    onDragStart(event) {
        event.dataTransfer.setData("monsterConfigurator", JSON.stringify({
            x: this._x,
            y: this._y,
            region: this._regionName,
        }));
    }

    neighborDropped() {
        this.shouldPerformAction = true;
        this.notifyPropertyChanged('shouldPerformAction');
    }

    onElementDropped(par) {
        
        const id = par.dataTransfer.getData("monsterConfigurator");
        const origin = JSON.parse(id);
        const { _x, _y, _regionName } = this;
        if (_x === origin.x && _y === origin.y && _regionName === origin.region) {
            return;
        }
        const rowNumber = Number.parseInt(_x.replace(/^\D*/g, ''))
        const y = Number.parseInt(_y);
        this._monster = MonsterDao.getInstance().moveMonster({ region: _regionName, x: _x, y: _y }, origin);
        ViewModelLocator.getInstance().getGridElementViewModel("Row" +(rowNumber + 1), y, _regionName).neighborDropped();
        ViewModelLocator.getInstance().getGridElementViewModel("Row" + (rowNumber - 1), y, _regionName).neighborDropped();
        ViewModelLocator.getInstance().getGridElementViewModel("Row" + (rowNumber), y + 1, _regionName).neighborDropped();
        ViewModelLocator.getInstance().getGridElementViewModel("Row" + (rowNumber), y - 1, _regionName).neighborDropped();
        this.isDraggingOver = false;        
        this.notifyAllPropertyChanged();
    }


    update() {


        const { _x, _y, _regionName } = this;
        this._monster = MonsterDao.getInstance().getMonsterByLocation({ region: _regionName, x: _x, y: _y }) || {};

        this.notifyAllPropertyChanged();
    }


}
