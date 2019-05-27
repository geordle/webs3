import { Monster } from "./monster";
import { MonsterType } from "./monsterType";

export class FireMonster extends Monster{

    /**
     * @param {Monster} original
     * */
    constructor(original){
        super(MonsterType.FIRE, original);
    }

    fur = "Scales";
    color = "Red";

    set arms(val) {
        this._arms = val;
        if (val > 2) {
            this.legs = 0;
        } else {
            this.legs =2;
        }
    }

    get arms() {
        return this._arms;
    }



    legs = 2;

}

