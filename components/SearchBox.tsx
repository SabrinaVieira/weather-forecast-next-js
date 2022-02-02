import { match } from 'assert';
import React, { useEffect, useState } from 'react';
import cities from '../lib/city.list.json'
import Link from 'next/link'

export interface ICity {
  id: number,
  name: string,
  state: string,
  country: string,
  coord: {
    lon: string,
    lat: string,
  },
  slug?:string,
}

const citiesArray = cities as ICity[];

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ICity[]>([]);

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

        if (macth) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`
          }
          matchingCities.push(cityData)
        }
      }
    }
    // console.log(matchingCities)
    return setResults(matchingCities)

  }

  // console.log(query)
  // console.log({ results })

  return (
  <div className='search'>
    <input type="text" onChange={handleChange} />
    {query.length > 3 && (
      <ul>
        {results.length > 0
          ? (
            results.map((city) => (
              <li key={city.slug}>
                < Link href={`/location/${city.slug}`}>
                {/* < Link href={`/location/${city.slug}`}> */}
                  <a>
                    {city.name}
                    {city.state ? `, ${city.state}` : ''}
                    <span>({city.country})</span>
                  </a>
                </Link>
              </li>
            ))
          )
          : (
            <li className="serch__no-result">
              No results found
            </li>
          )}
      </ul>
    )}
  </div>);
}
