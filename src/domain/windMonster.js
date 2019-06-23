import { Monster } from "./monster";
import { MonsterType } from "./monsterType";
import { weather } from "../components/weather";


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



    get actualPower(){
        const multiplier = weather.fieldType === "Mist" ? 1.1 : 1;
        return super.power * multiplier;
    }


    get canFly() {
        return true;
    }

    get canSwim() {
        return this.fur === "Scales" || this.fur === "Hair";
    }

    powerName = "WingAttack";


    set arms(value) {
        this._arms = 2;
    }

    get arms() {
        return this._arms;
    }
}
