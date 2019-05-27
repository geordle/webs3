import MonsterConfigurator from "./monsterConfigurator";
import { FireMonster } from "../fireMonster";
import { MonsterType } from "../monsterType";
import { Monster } from "../monster";




export class FireMonsterConfigurator extends MonsterConfigurator {


    constructor(){
        super();
    }

    /**
     * @param {Monster} value
    * */
    set monster(value){
        this._monster = new FireMonster(value);
    }

    maxArms = 6;

    get maxLegs() {
        return this.arms <= 2 ? 2 : 0;
    }

    get minLegs(){
        return this.maxLegs;
    }

    furTypes = ["Scales", "Feathers"];
    colors = ["Brown", "Orange", "Red"];
    armTypes = ["Tentacles", "Claws", "Claw-wings"];
    maxEyes = 4;
    minEyes = 0;
}
