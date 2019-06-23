import {Monster} from "./monster";
import { MonsterType } from "./monsterType";
import { weather } from "../components/weather";

export default class WaterMonster extends Monster {



    get canFly() {
        return false;
    }
    get canSwim(){
      return true;
    };



    /**
     * @param {Monster} original
     * */
    constructor(original){
        super(MonsterType.WATER, original);
        this.fur = this.fur ||"Scales";
        this.color = this.color || "Blue";
        this.armType  = this.armType  || "Tentacles";
    }

    get actualPower(){
        const multiplier = weather.fieldType === "Rain"? 1.1 : 1;
        return (super.power * multiplier).toFixed(2);
    }

    powerName = "WaterBeam";


    get arms() {
        return this._arms;
    }

    set arms(val) {
        this._arms = val;
        if (val > 4) {
            this.legs = 0;
        }
    }
}

