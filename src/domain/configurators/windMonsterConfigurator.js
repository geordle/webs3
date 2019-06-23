import MonsterConfigurator from "./monsterConfigurator";
import EarthMonster from "../earthMonster";
import { WindMonster } from "../windMonster";

export class WindMonsterConfigurator extends MonsterConfigurator {

    maxArms = 2;

    get maxLegs() {
        return 2;
    }

    /**
     * @param {MonsterElement} value
     * */
    set monster(value) {
        this._monster = new WindMonster(value);
    }

    armTypes = ["Wings", "claw-wings"];

    legSteps = 2;

    furTypes = ["Scales", "Slime", "Hair"];
    colors = ["Blue", "Green", "Red"];

    maxEyes = 2;
    minEyes = 2;

}
