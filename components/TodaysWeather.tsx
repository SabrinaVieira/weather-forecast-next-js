import moment from 'moment';
import Head from 'next/head';
import React from 'react';
import { IDaily } from '../pages/location/interdace';
import { ICity } from './SearchBox';

interface ITodaysWeather {
    city: ICity;
    weather: IDaily;
}

export default function TodaysWeather({ city, weather }: ITodaysWeather) {
    // console.log(city)
    console.log('weather', weather)
    // console.log(weather.temp.max)
    return (
        <div className='today'>
            <div className="today__inner">
                <div className="today__left-content">
                    <h1>
                        {city.name}{" "}({city.country})
                    </h1>
                    {/* toFixed(0) ==> remove the extras decial nubers - &deg ==> ° code symbol; */}
                    <h2>

                        <span>{weather?.temp.max.toFixed(0)}&deg;C</span>
                        <span>{weather?.temp.min.toFixed(0)}&deg;C</span>
                    </h2>

                    <div className="today__sun-times">
                    <div>
                        <span>Surise</span>
                        <span>{moment.unix(weather?.sunrise).format("MM/DD/YYYY hh:mm a")}</span>

                    </div>

                    <div>
                        <span>Sunset</span>
                        <span>{moment.unix(weather?.sunset).format("MM/DD/YYYY hh:mm a")}</span>

                    </div>
                </div>
                </div>
               

            </div>

        </div>
    )
}


// Windows = Shift + Alt + F
// Mac = Shift + Option + F
// Ubuntu = Ctrl + Shift + I