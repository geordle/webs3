import { MonsterConfiguratorVM } from "./form/monsterConfiguratorVM";
import { GridElementVM } from "./grid-element/gridElementVM";
import { MonsterConfiguratorStateHolder } from "../domain/configurators/monsterConfiguratorStateHolder";
import { FieldViewModel } from "./fieldViewModel";
import { IncinaratorVM } from "./incinarator/incinaratorVM";

export class ViewModelLocator {
    constructor() {
        this._gridElementMap = new Map();
        this._registerSingleton(MonsterConfiguratorVM, "monsterConfigurator");
        this._registerSingleton(MonsterConfiguratorStateHolder, "monsterConfiguratorStateHolder");
        this._registerSingleton(FieldViewModel, "fieldViewModel");
        this._registerSingleton(IncinaratorVM, 'incinaratorVm')
    }



    getGridElementViewModel(x, y, name) {
        if(x===0, y===0, name===0){
            return this.monsterConfigurator;
        }


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

    clearField(){
        this._gridElementMap = new Map();
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
