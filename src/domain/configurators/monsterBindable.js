import { ViewModel } from "../../utils/viewModel";

export class MonsterBindable extends ViewModel{

    _monster;

    get arms() {
        return this._monster.arms;
    }

    get monsterType(){
        return this._monster.discriminator;
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

    get name() {
        return this._monster.name;
    }

    set name(value) {
        this._monster.name = value;
    }

    get fur() {
        return this._monster.fur;
    }

    set fur(value) {
        this._monster.fur = value;
    }

    get armType() {
        return this._monster.armType;
    }

    set armType(value) {
        this._monster.armType = value;
    }

    get eyes() {
        return this._monster.eyes;
    }

    set eyes(value) {
        this._monster.eyes = value;
    }

    get color() {
        return this._monster.color;
    }

    set color(value) {
        this._monster.color = value;
    }

    get image() {
        return this._monster.image;
    }

    set image(value) {
        this._monster.image = value;
    }

    get monster() {
        return this._monster;
    };

    get actualPower(){
        return this._monster.actualPower;
    }

    get canSwim() {
        return this._monster.canSwim;
    }

    get canFly(){
        return this._monster.canFly;
    }

    get power() {
        return this._monster.power;
    }

    set power(value){
        this._monster.power = value;
    }

    get canDoSpecial(){
        return this._monster.canDoSpecial;
    }

}
