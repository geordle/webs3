import { Monster } from "./monster";
import { MonsterType } from "./monsterType";

export class FireMonster extends Monster{

    /**
     * @param {Monster} original
     * */
    constructor(original){
        super(MonsterType.FIRE, original);
        this.fur = this.fur || "Scales";
        this.color = this.fur || "Red";
        this.legs = this.legs || 2;
        this.armType = this.armType || "Tentacles";
    }



    get canSwim(){
        return false;
    }

    get canFly(){
        return this.fur === "Feathers";
    }

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




}

