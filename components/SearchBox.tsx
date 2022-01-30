import { match } from 'assert';
import React, { useEffect, useState } from 'react';
import cities from '../lib/city.list.json'

 interface ICity {
  id: number,
  name: string,
  state: string,
  country: string,
   coord: {
    lon: number,
     lat: number,
   }
 }

const citiesArray = cities as ICity[];

export default function SearchBox() {
  const [query, setQuery] = useState("");

  useEffect(() => {

  }, [query])

  function handleChange(e: any) {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];

    if (value.length > 3) {
      for (let city of citiesArray) {
        if (matchingCities.length > 5) {
          break;
        }

        const macth = city.name.toLowerCase().startsWith(value.toLowerCase());

        if(macth){
          matchingCities.push(city)
        }
      }
    }
  console.log(matchingCities)

  }

  console.log(query)

  return <div>
    <input type="text" onChange={handleChange} />
  </div>;
}
