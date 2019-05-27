import MonsterConfigurator from "./monsterConfigurator";
import { FireMonster } from "../fireMonster";
import EarthMonster from "../earthMonster";

export class EarthMonsterConfigurator extends MonsterConfigurator{


    /**
     * @param {Monster} value
     * */
    set monster(value){
        this._monster = new EarthMonster(value);
    }


    maxArms = 2;
    armType = ["Claws"];
    legSteps = 2;
    armTypes = ["Claws"];
    furTypes = ["Scales", "Hair", "Slime"];
    colors = ["Purple", "Orange", "White"];
    maxEyes = 2;
    minEyes = 2;

    get maxLegs() {
        return 6;
    }

    get minLegs() {
        return 2;
    }
}
