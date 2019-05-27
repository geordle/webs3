import { Monster } from "./monster";
import { MonsterType } from "./monsterType";


export class WindMonster extends Monster{


    /**
     * @param {Monster} original
     * */
    constructor(original){
        super(MonsterType.EARTH, original);
    }

    fur = "Scales";
    canFly = false;
    canSwim = true;
    color = "Blue";
    eyes = 2;

    _arms = 2;

    set arms(value){
        this._arms = 2;
    }

    get arms(){
        return this._arms;
    }
}
