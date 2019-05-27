import { MonsterType } from "./monsterType";
import { Monster } from "./monster";

export default class EarthMonster extends Monster{

    /**
     * @param {Monster} original
     * */
    constructor(original){
        super(MonsterType.EARTH, original);
    }

    fur = "Scales";
    color = "Purple";
    canFly = false;
    canSwim = true;
    eyes=2;
    _arms = 2;
    legs = 2;
    set arms(value){
        this._arms = 2;
    }

    get arms(){
        return this._arms;
    }
}
