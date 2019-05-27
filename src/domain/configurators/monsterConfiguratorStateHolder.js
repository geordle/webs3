import { MonsterType } from "../monsterType";
import { WaterMonsterConfigurator } from "./waterMonsterConfigurator";
import { FireMonsterConfigurator } from "./fireMonsterConfigurator";
import { EarthMonsterConfigurator } from "./earthMonsterConfigurator";
import { WindMonsterConfigurator } from "./windMonsterConfigurator";


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
        console.log(this.configurator);
        this.configurator.monster = currentMonster;
    }
}
