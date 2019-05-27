import { MonsterType } from "./monsterType";

export class Monster {

    uuid;
    _arms = 0;
    name = "";
    fur = "";
    armType = "";
    eyes = 0;
    color = "";
    legs = 0;
    discriminator;


    get arms() {
        return this._arms;
    }
    set arms(value) {
        return this._arms =value;
    }



    constructor(discriminator, original) {
        if(original && original.uuid && original.discriminator === discriminator){
            Object.assign(this, original);
        }
        else if(original){
            this.uuid = original.uuid;
            this.name = original.name;
        }
    }


}
