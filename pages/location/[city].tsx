import React from 'react';
import { ICity } from '../../components/SearchBox';
import cities from '../../lib/city.list.json'

const citiesArray = cities as ICity[];

export async function getServerSideProps(context: any) {
    const { params } = context;
    const city: ICity = getCity(params.city);
    // console.log(process.env.API_KEY);
    
    if (!city) {
        notFound: true;
    }
    
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lon=${city.coord.lon}&lat=${city.coord.lat}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`)
    const data = await res.json();

    if(!data){
        return {
            notFound: true,
        }
    }

    // console.log(data)
    const slug = params.city;

    return {
        props: {
            slug: slug,
            data: data,
        }
    }
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

export default function City({ slug, data }: any): JSX.Element {
    return <div>
        <h1>City Page</h1>
        <h2>{slug}</h2>
        {console.log(data)}
    </div>;
}
