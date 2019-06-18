import { MonsterType } from "./monsterType";

export class Monster {

    uuid;
    _arms = 0;
    name = "";
    fur;
    armType;
    eyes = 0;
    color;
    legs = 0;
    discriminator;

    image = [];
    get arms() {
        return this._arms;
    }
    set arms(value) {
        return this._arms =value;
    }

    power = 0;

    constructor(discriminator, original) {
        this.discriminator = discriminator;

        if(original && original.uuid && original.discriminator === discriminator){
            Object.assign(this, original);
        }
        else if(original){
            this.uuid = original.uuid;
            this.name = original.name;
        }
    }


}
