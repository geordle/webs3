import { MonsterType } from "./monsterType";
import { Monster } from "./monster";

export default class EarthMonster extends Monster{

    /**
     * @param {Monster} original
     * */
    constructor(original){
        super(MonsterType.EARTH, original);
        this.fur = this.fur || "Scales";
        this.color = this.color || "Purple";
        this.eyes =  this.eyes ||2;
        this._arms = this._arms || 2;
        this.legs = this.legs || 2;
        this.armType = this.armType || "Claws";

    }



    get canFly(){
        return false;
    }

    get canSwim(){
        return true;
    }

    set arms(value){
        this._arms = 2;
    }

    get arms(){
        return this._arms;
    }
}
