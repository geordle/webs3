import Monster from "./monster";

export class WindMonster extends Monster{

    maxArms = 2;
    armType = ["Wings", "Claw wings"];

    get maxLegs() {
        return 4;
    }

    legSteps = 2;
    fur = "Scales";

    furTypes = ["Scales", "Slime", "Hair"];
    canFly = false;
    canSwim = true;
    colors = ["Blue", "Green", "Red"];
    color = "Blue";

    maxEyes= 2;
    minEyes = 2;
}
