import { EarthMonsterConfigurator } from "./configurators/earthMonsterConfigurator";
import { WaterMonsterConfigurator } from "./configurators/waterMonsterConfigurator";
import { FireMonsterConfigurator } from "./configurators/fireMonsterConfigurator";
import { WindMonsterConfigurator } from "./configurators/windMonsterConfigurator";

export default class MonsterConfiguratorFactory {

    /**
     *
     * @param name
     * @returns {MonsterConfigurator}
     */
    create(name) {
        switch (name) {
            case "Water":
                return new WaterMonsterConfigurator();
            case "Aarde":
                return new EarthMonsterConfigurator();
            case "Wind":
                return new WindMonsterConfigurator();
            case "Vuur":
                return new FireMonsterConfigurator();
            default:
                throw new Error(`${name} undefined`);
        }
    }


    /**
     *
     * @returns {MonsterConfiguratorFactory}
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new MonsterConfiguratorFactory();
        }
        return this.instance;
    }
}
