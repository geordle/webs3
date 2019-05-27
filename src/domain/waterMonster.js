import {Monster} from "./monster";
import { MonsterType } from "./monsterType";

export default class WaterMonster extends Monster {
    fur = "Scales";
    color = "Blue";
    canFly = false;
    canSwim = true;

    /**
     * @param {Monster} original
     * */
    constructor(original){
        super(MonsterType.WATER, original);
    }


    get arms() {
        return this._arms;
    }

    set arms(val) {
        this._arms = val;
        console.log(val);
        if (val > 4) {
            this.legs = 0;
        }
    }
}

