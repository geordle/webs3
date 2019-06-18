/**
 * @property {Monster} _monster
* */
import { Monster } from "../monster";
import { MonsterDao } from "./monsterDao";
import { MonsterBindable } from "./monsterBindable";

export default class MonsterConfigurator extends MonsterBindable {

    legSteps = 1;
    armTypes = [];

    get uuid(){
        return this._monster.uuid;
    }

    get minLegs(){
        return 0;
    }

    /**
     * @param {Monster} value
     * */
    set monster(value) {
        this._monster = value;
    }
    get monsterVal(){
        return this._monster;
    }


    save() {
        return MonsterDao.getInstance().saveMonster({x:0,y:0,region:0}, this._monster);
    }


}

