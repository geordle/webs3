import MonsterConfigurator from "./monsterConfigurator";
import WaterMonster from "../waterMonster";
import { WindMonster } from "../windMonster";

export class WaterMonsterConfigurator extends MonsterConfigurator {


    maxArms = 8;


    /**
     * @param {Monster} value
     * */
    set monster(value){
        this._monster = new WaterMonster(value);
    }


    get maxLegs() {
        return this.arms <= 4 ? 4 : 0;
    }

    armTypes = ["Tentacles", "Fins"];
    furTypes = ["Scales", "Slime"];
    colors = ["Blue", "Green", "Red"];
    maxEyes = 8;
    minEyes = 0;
}
