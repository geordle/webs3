import Monster from "./monster";

export class WaterMonster extends Monster {

    constructor(){
        super();


    }

    set arms(val){
        this._arms = val;
        if(val > 4){
            this.legs = 0;
        }
    }

    get arms(){
        return this._arms;
    }


    maxArms = 8;
    armType = ["Tentacles", "Fins"];

    get maxLegs() {
        return this.arms <= 4? 4: 0;
    }

    fur = "Scales";
    color = "Blue";
    furTypes = ["Scales", "Slime"];
    canFly = false;
    canSwim = true;
    colors = ["Blue", "Green", "Red"];

    maxEyes= 8;
    minEyes = 0;
}
