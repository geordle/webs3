export class Weather {
    _fieldType = "Mist";

    set fieldType(value){
        switch (value) {
            case "Mist":
            case "Fog":
                this._fieldType = "Mist";
                break;
            case "Rain":
                this._fieldType = "Rain";
                break;
            case "Clear":
                this._fieldType = "Clear";
                break;
            case "Snow":
                this._fieldType = "Snow";
                break;
            default:
                console.warn(`${value} not in weather list`);
        }
    }

    get fieldType(){
        return this._fieldType;
    }
}

const weather = new Weather();

export {weather};
