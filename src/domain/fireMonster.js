import Monster from "./monster";

export class FireMonster extends Monster {
    maxArms = 6;
    armType = ["Tentacles", "Fins"];

    get maxLegs() {
        return 2;
    }

    fur = "Scales";
    color = "Red";
    furTypes = ["Scales", "Feathers"];
    canFly = false;
    canSwim = true;
    colors = ["Brown", "Orange", "Red"];

    maxEyes= 4;
    minEyes = 0;
}
