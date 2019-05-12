import { MonsterConfiguratorVM } from "./form/monsterConfiguratorVM";

export class ViewModelLocator {


    constructor() {
        this.registerSingleton(MonsterConfiguratorVM, "monsterConfigurator");
    }


    registerSingleton(classProp, key = classProp.constructor.name) {
        let instance;
        Object.defineProperty(this, key, {
            get: () => {
                if (!instance) {
                    instance = new classProp;
                }
                return instance;
            },
        });
    }

    static getInstance() {
        if (!ViewModelLocator._instance) {
            ViewModelLocator._instance = new ViewModelLocator();
        }
        return ViewModelLocator._instance;
    }
}
