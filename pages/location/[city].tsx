import { GetServerSideProps } from 'next';
import React from 'react';
import { ICity } from '../../components/SearchBox';
import cities from '../../lib/city.list.json'

const citiesArray = cities as ICity[];

export async function getServerSideProps<GetServerSideProps>(context: any) {
    const city = getCity(context.params.city);
    console.log(city);

    if (!city) {
        notFound: true;
    }

    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`)
    const data = await res.json();

    if(!data){
        return {
            notFound: true,
        }
    }

    console.log(data)
    const slug = context.params.city;


    return {
        props: {
            slug: slug
        }
    }
}

function getCity(params: any) {
    const citParam = params.trim();
    // get the id of the city
    const splitCity = citParam.split("-");
    const id = splitCity[splitCity.length - 1]
    console.log(splitCity, id);

    if (!id) {
        return null
    }

    const city = citiesArray.find(city => city.id.toString() == id)
}

export default function City({ slug }: any): JSX.Element {
    return <div>
        <h1>City Page</h1>
        <h2>{slug}</h2>
    </div>;
}
