import { Monster } from "./monster";
import { MonsterType } from "./monsterType";


export class WindMonster extends Monster {


    /**
     * @param {Monster} original
     * */
    constructor(original) {
        super(MonsterType.EARTH, original);
        this.color = this.color || "Blue";
        this.eyes = this.eyes || 2;
        this._arms = this._arms || 2;
        this.fur = this.fur || "Scales";
        this.armType = this.armType || "Wings";
    }


    get canFly() {
        return true;
    }

    get canSwim() {
        return this.fur === "Scales" || this.fur === "Hair";
    }


    set arms(value) {
        this._arms = 2;
    }

    get arms() {
        return this._arms;
    }
}
