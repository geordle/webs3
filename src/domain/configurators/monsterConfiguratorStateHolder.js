import { MonsterType } from "../monsterType";
import { WaterMonsterConfigurator } from "./waterMonsterConfigurator";
import { FireMonsterConfigurator } from "./fireMonsterConfigurator";
import { EarthMonsterConfigurator } from "./earthMonsterConfigurator";
import { WindMonsterConfigurator } from "./windMonsterConfigurator";
import { Monster } from "../monster";


export class MonsterConfiguratorStateHolder {


    _configurators = new Map();

    constructor() {
        this._configurators.set(MonsterType.WATER, this.configurator = new WaterMonsterConfigurator());
        this._configurators.set(MonsterType.FIRE, new FireMonsterConfigurator());
        this._configurators.set(MonsterType.EARTH, new EarthMonsterConfigurator());
        this._configurators.set(MonsterType.WIND, new WindMonsterConfigurator());
        this.type = MonsterType.WATER;
    }



    setType(type) {
        this.type = type;
        const currentMonster = this.configurator.monster;
        this.configurator = this._configurators.get(type);
        this.configurator.monster = currentMonster;
    }


    setMonster(monster) {

        this.configurator.monster = monster;

        this.setType(monster.discriminator);
    }

    reset(){
        this.configurator = {};
        this.setType(MonsterType.WATER);
    }
}
