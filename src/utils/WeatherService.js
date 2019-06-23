export class WeatherService {


    getWeather(city) {
        return Promise.resolve("Clear");
        
        // TODO uncomment
        // fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a10418fbc36c7dc68c17ddc922add174`)
        //     .then(value =>
        //         value.json(),
        //     ).then((weather) => weather.weather[0].main);
    }


    static getInstance() {
        if (!this.instance) {
            this.instance = new WeatherService();
        }
        return this.instance;
    }
}

const weatherService = new WeatherService();

export { weatherService };
