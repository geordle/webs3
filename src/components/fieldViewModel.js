import { ViewModelLocator } from "./viewModelLocator";
import { weatherService } from "../utils/WeatherService";
import field from "../domain/field";
import { weather} from "./weather";
import { ViewModel } from "../utils/viewModel";

export class FieldViewModel extends ViewModel{
    constructor() {
        super();
        this.region = "Jungle";
        this.weather = weather;
    }

    updateWeatherForReferenceCity(){
        try {

            const region = field.find(({name}) => name === this.region);
                 weatherService.getWeather(region['reference city'])
                     .then(value => {
                this.fieldType = value;
            })
        } catch (e) {
            console.log(e);

        }
    }


    get fieldType(){
        return this.weather.fieldType;
    }

    set fieldType(value){
        this.weather.fieldType = value;
        ViewModelLocator.getInstance().getAllGridElementViewModels().forEach(el => {
            el.update();
        });
    }

    set region(value){
        this._region = value;
        this.updateWeatherForReferenceCity();
    }


    get region(){
        return this._region;
    }

    changeTo({target:{value}}) {
        ViewModelLocator.getInstance().clearField();

        this.region = value;
    }



}
