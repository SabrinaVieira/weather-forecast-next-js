import moment from 'moment-timezone';
import Head from 'next/head';
import React from 'react';
import HourlyWeather from '../../components/HourlyWeather';
import { ICity } from '../../components/SearchBox';
import TodaysWeather from '../../components/TodaysWeather';
import WeeklyWeather from '../../components/WeeklyWeather';
import cities from '../../lib/city.list.json'
import { Current, IDaily, IHourly, IWeatherData } from './interdace';

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
    // console.log(data.timezone)

    const slug = params.city;
    const hourlyWeather = getHourlyWhether(data?.hourly, data?.timezone)
    return {
        props: {
            // data: data,
            // data,
            slug: slug,
            city: city,
            timezone: data.timezone,
            currentWeather: data.current,
            dailyWeather: data.daily, // IDaily[]
            hourlyWeather: hourlyWeather,
        }
    }
}

const getHourlyWhether = (hourlyData: IHourly[], timezone: string) => {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const endOfdayTimeStamp = Math.floor(endOfDay / 1000);
    const todayData = hourlyData.filter((data) => data.dt < endOfdayTimeStamp);
    // // console.log(hourlyData.dt) <== dt nao exite em Hourly[]
    // const current = new Date();
    // current.setHours(current.getHours(), 0, 0, 0);

    // const tomorrow = new Date(current);
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // tomorrow.setHours(0, 0, 0, 0)
    // /// divide  by 1000 get seconds
    // const currentTimeStemp = Math.floor(current.getTime() / 1000);
    // const currentTomorrowTimeStemp = Math.floor(tomorrow.getTime() / 1000);
    // const TodayData = hourlyData?.filter((data) => data.dt < currentTomorrowTimeStemp && data.dt);
    // //console.log(TodayData.length)

    return todayData;
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

interface ICityPage {
    city:  ICity,
    timezone: string,
    currentWeather: Current,
    dailyWeather: IDaily[],
    hourlyWeather: IHourly[], 
}

export default function City({
    city,
    timezone,
    currentWeather,
    dailyWeather,
    hourlyWeather }: ICityPage): JSX.Element {
    // console.log('dailyWeather[0]', dailyWeather[0])
    return <div>
        <Head>
            <title>{city.name}</title>
        </Head>

        <div className="page-wrapper">
            <div className="container">
                <TodaysWeather city={city} dailyWeather={dailyWeather[0]} timezone={timezone}/>
                <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone}/>
                <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone}/>
            </div>
        </div>
    </div>;
}
