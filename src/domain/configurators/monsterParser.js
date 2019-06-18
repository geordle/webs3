import { MonsterType } from "../monsterType";
import { WindMonster } from "../windMonster";
import WaterMonster from "../waterMonster";
import { FireMonster } from "../fireMonster";
import EarthMonster from "../earthMonster";

export class MonsterParser {

    parseMonster(monster) {
        let monsterPojo = JSON.parse(monster);

        switch (monsterPojo.discriminator) {
            case MonsterType.WIND:
                return new WindMonster(monsterPojo);
            case MonsterType.WATER:
                return new WaterMonster(monsterPojo);
            case MonsterType.FIRE:
                return new FireMonster(monsterPojo);
            case MonsterType.EARTH:
                return new EarthMonster(monsterPojo);
        }
    }

    /**
     *
     * @returns {MonsterParser}
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new MonsterParser();
        }
        return this.instance;
    }
}
