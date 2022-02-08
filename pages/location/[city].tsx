import Head from 'next/head';
import { title } from 'process';
import React from 'react';
import { ICity } from '../../components/SearchBox';
import TodaysWeather from '../../components/todaysWeather';
import cities from '../../lib/city.list.json'
import { IHourly, IWeatherData } from './interdace';

const citiesArray = cities as ICity[];

export async function getServerSideProps(context: any) {
    const { params } = context;
    const city: ICity = getCity(params.city);
    //console.log(city.coord)
    // console.log(process.env.API_KEY);

    if (!city) {
        notFound: true;
    }

    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lon=${city?.coord.lon}&lat=${city?.coord.lat}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`)
    const data: IWeatherData = await res.json();

    if (!data) {
        return {
            notFound: true,
        }
    }

    // console.log(data)
    // console.log(data.hourly)

    const slug = params.city;

    return {
        props: {
            slug: slug,
            // data: data,
            // data,
            city: city,
            currentWeather: data.current,
            dailyWeather: data.daily, // IDaily[]
            hourlyWeather: getHourlyWhether(data.hourly)
        }
    }
}

const getHourlyWhether = (hourlyData: IHourly[]) => {
    // console.log(hourlyData.dt) <== dt nao exite em Hourly[]
    const current = new Date();
    current.setHours(current.getHours(), 0, 0, 0);

    const tomorrow = new Date(current);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0)
    /// divide  by 1000 get seconds
    const currentTimeStemp = Math.floor(current.getTime() / 1000);
    const currentTomorrowTimeStemp = Math.floor(tomorrow.getTime() / 1000);


    const TodayData = hourlyData?.filter((data) => data.dt < currentTomorrowTimeStemp && data.dt);
    //console.log(TodayData.length)

    return TodayData;
}

function getCity(params: string): ICity | any {

    const citParam = params.trim();
    const splitCity = citParam.split("-");
    const id = splitCity[splitCity.length - 1]
    // console.log(splitCity, id);

    if (!id) {
        return null
    }

    const city = citiesArray.find(city => city.id.toString() == id)
    return city
}

// interface IICity {
//     city: ICity;
//     currentWeather: ,
//     dailyWeather,
//     hourlyWeather
// }

export default function City({
    city,
    currentWeather,
    dailyWeather,
    hourlyWeather }: any): JSX.Element {
    // console.log('dailyWeather[0]', dailyWeather[0])
    return <div>
        <Head>
            <title>{city.name}</title>
        </Head>

        <div className="page-wrapper">
            <div className="container">
                <TodaysWeather city={city} weather={dailyWeather[0]} />

            </div>
        </div>
    </div>;
}
