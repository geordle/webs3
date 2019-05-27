import MonsterFactory from "../../domain/monsterFactory";
import { ViewModel } from "../../utils/viewModel";
import { genUuid } from "../../utils/logicHelpers";
import { ViewModelLocator } from "../viewModelLocator";


export class MonsterConfiguratorVM extends ViewModel {
    constructor() {
        super();
        this.drawButtonText = "save";
        this.isEditing = false;
        this.monsterConfiguratorStateHolder = ViewModelLocator.getInstance().monsterConfiguratorStateHolder;
        this.monsterType = "Water";

    }

    switchIsDrawing() {
        this.isEditing = !this.isEditing;
        this.drawButtonText = this.isEditing ? "draw" : "save";
        if(!this.isEditing) {
            this.monsterConfigurator.save();
        }
    }


    get maxEyes() {
        return this.monsterConfigurator.maxEyes;
    }

    get minEyes() {
        return this.monsterConfigurator.minEyes;
    }


    get maxArms() {
        return this.monsterConfigurator.maxArms;
    }

    get maxLegs() {
        return this.monsterConfigurator.maxLegs;
    }
    get minLegs() {
        return this.monsterConfigurator.minLegs;
    }


    get colors() {
        return this.monsterConfigurator.colors;
    }

    get furTypes() {
        return this.monsterConfigurator.furTypes;
    }

    set arms(value) {
        this.monsterConfigurator.arms = Number(value);
        this.notifyPropertyChanged("maxLegs", "legs", "minLegs");
    }

    get arms() {
        return this.monsterConfigurator.arms;
    }

    set legs(value) {
        this.monsterConfigurator.legs = value;
    }

    get legs() {
        return this.monsterConfigurator.legs;
    }

    get eyes() {
        return this.monsterConfigurator.eyes;
    }

    set eyes(value) {
        this.monsterConfigurator.eyes = value;
    }

    get legSteps() {
        return this.monsterConfigurator.legSteps;
    }

    get monsterName() {
        return this.monsterConfigurator.name;
    }

    set monsterName(value) {
        if (value.length < 10) {
            this.monsterConfigurator.name = value;
        }
    }

    set fur(value) {
        this.monsterConfigurator.fur = value;
    }

    get fur() {
        return this.monsterConfigurator.fur;
    }

    get color() {
        return this.monsterConfigurator.color;
    }

    set color(value) {
        this.monsterConfigurator.color = value;
    }

    set monsterType(type) {
        this._monsterType = type;
        this.monsterConfiguratorStateHolder.setType(type);
        this.notifyAllPropertyChanged("monsterType");
    }

    get monsterType() {
        return this._monsterType;
    }

    onDragStart(event) {
        event.dataTransfer.setData("monsterConfigurator", JSON.stringify(this.monsterConfigurator.saveMonster()));
    }


    get monsterConfigurator(){
        return this.monsterConfiguratorStateHolder.configurator;
    }


    get armTypes() {
        return this.monsterConfigurator.armTypes;
    }

}
