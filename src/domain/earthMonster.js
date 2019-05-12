import Monster from "./monster";

export class EarthMonster extends Monster{
    maxArms = 2;
    armType = ["Claws"];

    get maxLegs() {
        return 4;
    }

    legSteps = 2;

    fur = "Scales";

    color = "Purple";
    furTypes = ["Scales", "Hair", "Slime"];
    canFly = false;
    canSwim = true;
    colors = ["Purple", "Orange", "White"];
    maxEyes= 2;
    minEyes = 2;
}
