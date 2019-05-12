import { WaterMonster } from "./waterMonster";
import { EarthMonster } from "./earthMonster";
import { WindMonster } from "./windMonster";
import { FireMonster } from "./fireMonster";

export default class MonsterFactory {

    /**
     *
     * @param name
     * @returns {Monster}
     */
    create(name) {
        switch (name) {
            case "Water":
                return new WaterMonster();
            case "Aarde":
                return new EarthMonster();
            case "Wind":
                return new WindMonster();
            case "Vuur":
                return new FireMonster();
            default:
                throw new Error(`${name} undefined`);
        }
    }


    /**
     *
     * @returns {MonsterFactory}
     */
    static getInstance() {
        if(!this.instance){
            this.instance = new MonsterFactory();
        }
        return this.instance;
    }
}
