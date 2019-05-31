import { MonsterConfiguratorVM } from "./form/monsterConfiguratorVM";
import { GridElementVM } from "./grid-element/gridElementVM";
import { BackgroundViewModel } from "./backgroundViewModel";
import { MonsterConfiguratorStateHolder } from "../domain/configurators/monsterConfiguratorStateHolder";

class FieldViewModel {
    constructor() {
        this.fieldtype ="water";
    }
}

export class ViewModelLocator {
    constructor() {
        this._gridElementMap = new Map();
        this._registerSingleton(MonsterConfiguratorVM, "monsterConfigurator");
        this._registerSingleton(MonsterConfiguratorStateHolder, "monsterConfiguratorStateHolder");
        this._registerSingleton(FieldViewModel, "fieldViewModel");
    }

    getGridElementViewModel(x, y, name) {
        const keyString = `${x},${y},${name}`;
        let vm = this._gridElementMap.get(keyString);
        if (!vm) {
            vm = new GridElementVM({ x, y, name });
            this._gridElementMap.set(keyString, vm);
        }
        return vm;
    }

    _registerSingleton(classProp, key = classProp.constructor.name) {
        let instance;
        Object.defineProperty(this, key, {
            get: () => {
                if (!instance) {
                    instance = new classProp();
                }
                return instance;
            },
        });
    }

    /**
     *
     * @returns {ViewModelLocator}
     */
    static getInstance() {
        if (!ViewModelLocator._instance) {
            ViewModelLocator._instance = new ViewModelLocator();
        }
        return ViewModelLocator._instance;
    }
}
