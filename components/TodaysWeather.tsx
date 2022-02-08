import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { IDaily } from '../pages/location/interdace';
import { ICity } from './SearchBox';

interface ITodaysWeather {
    city: ICity;
    weather: IDaily;
}

export default function TodaysWeather({ city, weather }: ITodaysWeather) {
    // console.log(city)
    console.log({weather})
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
                            <span>{moment.unix(weather?.sunrise).format("LT")}</span>

                        </div>

                        <div>
                            <span>Sunset</span>
                            <span>{moment.unix(weather?.sunset).format("LT")}</span>

                        </div>
                    </div>
                </div>

                <div className="today__right-content">
                    <div className="today__icon-wrapper">
                        <Image
                            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="Weather Icon" layout='fill' />
                        <h3>{weather?.weather[0].description}</h3>
                    </div>
                </div>

            </div>

        </div>
    )
}


// Windows = Shift + Alt + F
// Mac = Shift + Option + F
// Ubuntu = Ctrl + Shift + I