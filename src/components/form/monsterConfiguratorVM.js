import { ViewModel } from "../../utils/viewModel";
import { ViewModelLocator } from "../viewModelLocator";
import { MonsterDao } from "../../services/monsterDao";


export class MonsterConfiguratorVM extends ViewModel {
    constructor() {
        super();
        this.drawButtonText = "save";
        this.isEditing = false;
        this.monsterConfiguratorStateHolder = ViewModelLocator.getInstance().monsterConfiguratorStateHolder;
        const monster = MonsterDao.getInstance().getMonsterByLocation({ region: 0, x: 0, y: 0 });
        if (monster) {
            this.monsterConfiguratorStateHolder.setMonster(monster);
        }

        this.monsterType = "Water";
    }

    switchIsDrawing() {
        this.isEditing = !this.isEditing;
        this.drawButtonText = this.isEditing ? "edit" : "save";
    }

    set arms(value) {
        this.monsterConfigurator.arms = Number(value);
        this.notifyPropertyChanged("maxLegs", "legs", "minLegs");
    }

    set monsterName(value) {

        if (value.length < 10) {
            this.monsterConfigurator.name = value;
        }
        this.notifyPropertyChanged("cantSave");
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
        this.monsterConfigurator.save();
        event.dataTransfer.setData("monsterConfigurator", JSON.stringify({ x: 0, y: 0, region: 0 }));
    }

    update() {
        this.monsterConfiguratorStateHolder.reset();
        this.isEditing = false;
        this.reset = true;
        this.notifyAllPropertyChanged();
    }

    onDragOver(event) {
        if (!this.isRock) {
            event.preventDefault();
        }
    }

    onElementDropped(par) {
        const id = par.dataTransfer.getData("monsterConfigurator");
        const origin = JSON.parse(id);
        try {
            const monster = MonsterDao.getInstance().moveMonster({ region: 0, x: 0, y: 0 }, origin);
            this.monsterConfiguratorStateHolder.setMonster(monster);
            this.switchIsDrawing();
            this.notifyAllPropertyChanged();
        } catch (e) {

        }

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

    get image() {
        return this.monsterConfigurator.image;
    }

    set image(value) {
        this.monsterConfigurator.image = value;
    }


    get monsterConfigurator() {
        return this.monsterConfiguratorStateHolder.configurator;
    }


    get armType() {
        return this.monsterConfigurator.armType;
    }

    set armType(value) {
        this.monsterConfigurator.armType = value;
    }

    reset = false;

    get armTypes() {
        return this.monsterConfigurator.armTypes;
    }

    get power() {
        return this.monsterConfigurator.power;
    }

    set power(value) {
        this.monsterConfigurator.power = value;
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

    get hasExistingMonster() {
        return !!this.monsterConfigurator.uuid;
    }

    get maxEyes() {
        return this.monsterConfigurator.maxEyes;
    }

    get minEyes() {
        return this.monsterConfigurator.minEyes;
    }

    get cantSave() {
        return !this.monsterConfigurator.name || this.monsterConfigurator.name.length === 0;
    }


}
