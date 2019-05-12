import MonsterFactory from "../../domain/monsterFactory";
import { ViewModel } from "../../utils/viewModel";

export class MonsterConfiguratorVM extends ViewModel {
    constructor() {
        super();
        this.monsterType = "Water";


    }

    get maxEyes() {
        return this.monster.maxEyes;
    }

    get minEyes() {
        return this.monster.maxEyes;
    }

    get maxArms() {
        return this.monster.maxArms;
    }

    get maxLegs() {
        return this.monster.maxLegs;
    }

    get colors() {
        return this.monster.colors;
    }

    get furTypes() {
        return this.monster.furTypes;
    }

    set arms(value) {
        this.monster.arms = value;
        this.notifyPropertyChanged("maxLegs", "legs");
    }

    get arms() {
        return this.monster.arms;
    }

    set legs(value) {
        this.monster.legs = value;
    }
    
    get legs() {
        return this.monster.legs;
    }

    get monsterName(){
        return this.monster.name;
    }

    set monsterName(value) {
        if(value.length < 10){
            this.monster.name = value;
        }
    }

    set fur(value) {
        this.monster.fur = value;
    }

    get fur(){
        return this.monster.fur;
    }
    get color(){
        return this.monster.color;
    }

    set color(value){
        this.monster.color = value;
    }

    set monsterType(val) {
        this._monsterType = val;
        this.monster = MonsterFactory.getInstance().create(val);
        this.notifyAllPropertyChanged('monsterType');
    }

    get monsterType() {
        return this._monsterType;
    }

    submitted() {
        console.log();
        console.log(this);
    }


}
