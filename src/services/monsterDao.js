import { genUuid } from "../utils/logicHelpers";
import { StoragePrefix } from "../utils/Constants";
import { MonsterParser } from "../domain/configurators/monsterParser";
import { ViewModelLocator } from "../components/viewModelLocator";

export class MonsterDao {


    /**
     * @param target
     * @param origin
     * */
    moveMonster(target, origin) {
        let targetKey = `${StoragePrefix.LOCATION_PREFIX}${target.x},${target.y},${target.region}`;
        let originKey = origin && `${StoragePrefix.LOCATION_PREFIX}${origin.x},${origin.y},${origin.region}`;
        const filledInTarget = this.getMonsterByLocation(target);
        if (filledInTarget) {
            throw Error("Element already filled");
        }

        const originMonster = this.getMonsterByLocation(origin);
        localStorage.setItem(targetKey, JSON.stringify(originMonster));
        localStorage.removeItem(originKey);
        ViewModelLocator.getInstance().getGridElementViewModel(origin.x, origin.y, origin.region).update();

        return originMonster;
    }

    saveMonster(target, monster) {
        if (!monster.uuid) {
            monster.uuid = genUuid();
        }
        let targetKey = `${StoragePrefix.LOCATION_PREFIX}${target.x},${target.y},${target.region}`;
        localStorage.setItem(targetKey, JSON.stringify(monster));
    }


    getMonsterByLocation({ x, y, region }) {
        let key = `${StoragePrefix.LOCATION_PREFIX}${x},${y},${region}`;
        let monster = localStorage.getItem(key);
        if (!monster) {
            return null;
        }
        try {
            return MonsterParser.getInstance().parseMonster(monster);
        } catch (e) {
            localStorage.removeItem(key);
        }
    }

    get(key) {
        let monster = localStorage.getItem(key);
        if (!monster) {
            return null;
        }
        return MonsterParser.getInstance().parseMonster(monster);
    }

    removeMonster({ x, y, region }) {
        let key = `${StoragePrefix.LOCATION_PREFIX}${x},${y},${region}`;
        localStorage.removeItem(key);
        ViewModelLocator.getInstance().getGridElementViewModel(x, y, region).update();
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
