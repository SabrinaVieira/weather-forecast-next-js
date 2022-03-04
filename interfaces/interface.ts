
    export interface Weather {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

    export interface Current {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        weather: Weather[];
    }

    export interface Weather2 {
        id: number;
        main: string;
        description: string;
        icon: string;
    }


    export interface IHourly {
        dt: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        wind_gust: number;
        weather: Weather2[];
        pop: number;
    }

    export interface Temp {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
    }

    export interface FeelsLike {
        day: number;
        night: number;
        eve: number;
        morn: number;
    }

    export interface Weather3 {
        id: number;
        main: string;
        description: string;
        icon: string;
    }

    export interface IDaily {
        dt: number;
        sunrise: number;
        sunset: number;
        moonrise: number;
        moonset: number;
        moon_phase: number;
        temp: Temp;
        feels_like: FeelsLike;
        pressure: number;
        humidity: number;
        dew_point: number;
        wind_speed: number;
        wind_deg: number;
        wind_gust: number;
        weather: Weather3[];
        clouds: number;
        pop: number;
        rain: number;
        uvi: number;
        snow?: number;
    }

    export interface IWeatherData {
        lat: string;
        lon: string;
        timezone: string;
        timezone_offset: number;
        current: Current;
        hourly: IHourly[];
        daily: IDaily[];
    }


