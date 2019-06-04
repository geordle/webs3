/**
 * @property {Monster} _monster
* */
import { Monster } from "../monster";
import { MonsterDao } from "./monsterDao";

export default class MonsterConfigurator {

    legSteps = 1;
    armTypes = [];

    get uuid(){
        return this._monster.uuid;
    }

    get arms() {
        return this._monster.arms;
    }
    set arms(val) {
        this._monster.arms = val;
    }

    get legs() {
        return this._monster.legs;
    }
    set legs(val) {
        this._monster.legs = val;
    }


    get name () {
        return this._monster.name;
    }
    set name (value){
        this._monster.name = value;
    }

    get fur(){
        return this._monster.fur;
    }

    set fur(value) {
        this._monster.fur = value;
    }

    get armType(){
        return this._monster.armType;
    }

    set armType(value){
        this._monster.armType = value;
    }

    get eyes(){
        return this._monster.eyes;
    }

    set eyes(value){
        this._monster.eyes =value;
    }

    get color(){
        return this._monster.color;
    }
    set color(value) {
        this._monster.color = value;
    }



    get monster(){
        return this._monster;
    };

    /**
     * @param {Monster} value
     * */
    set monster(value){
        this._monster = value;
    }



    get minLegs(){
        return 0;
    }


    save() {
        MonsterDao.getInstance().save(this._monster);
    }
}

