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

    powerName;

    image = [];
    _power = 0;
    get arms() {
        return this._arms;
    }
    set arms(value) {
        return this._arms =value;
    }

    get power(){
        return this._power;
    }

    set power(value){
        this._power = value;
    }

    get canDoSpecial(){
        return this.power >= 8;
    }

    constructor(discriminator, original) {
        this.discriminator = discriminator;

        if(original && original.uuid && original.discriminator === discriminator){
            Object.assign(this, original);
        }
        else if(original){
            this.image = original.image;
            this.uuid = original.uuid;
            this.name = original.name;
        }
    }


    get actualPower(){
        return this.power;
    }

}
