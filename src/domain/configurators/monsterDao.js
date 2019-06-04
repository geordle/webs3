import { genUuid } from "../../utils/logicHelpers";
import { StoragePrefix } from "../../utils/Constants";

export class MonsterDao {



    /** @param {Monster} monster
    * */
    save(monster){

        if(!monster.uuid){
            monster.uuid = genUuid();
        }
        localStorage.setItem(`${StoragePrefix.MONSTER_PREFIX}${monster.uuid}`, JSON.stringify(monster));
    }

    get(uuid){
        let monster;
        if(uuid){
             monster = localStorage.getItem(`${StoragePrefix.MONSTER_PREFIX}`);
        }

        if(!monster) {
            console.error(`monster with id ${uuid} does not exist`);
        }

        return monster;
    }

    /**
     *
     * @returns {MonsterDao}
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new MonsterDao();
        }
        return this.instance;
    }
}
