
export default class Monster {


    _arms = 0;
    name = "";
    set arms(val){
        this._arms = val;
    }

    fur = "";

    legSteps = 1;

    get arms(){
        return this._arms ;
    }

    eyes = 0;
    coatType = "";
    color = "";
    legs = 0;
}
