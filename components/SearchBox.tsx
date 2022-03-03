import { match } from 'assert';
import React, { useEffect, useState } from 'react';
import cities from '../lib/city.json'
import Link from 'next/link'
import Router from 'next/router';

export interface ICity {
  id: number,
  name: string,
  state: string,
  country: string,
  coord: {
    lon: number,
    lat: number,
  },
  slug?: string,
}


interface ISearchBox {
  placeholder?: string;
}

export default function SearchBox({ placeholder }: ISearchBox) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ICity[]>();

  useEffect(() => {
    const clearQuery = () => setQuery("");

    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery)
    }
  }, [])

  function handleChange(e: any) {
    const { value } = e.target;
    setQuery(value);

    let matchingCities: ICity[] = [];

    if (value.length > 3) {
      for (let city of cities) {
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
      <input type="text" onChange={handleChange} placeholder={placeholder ? placeholder : ""} />
      {query.length > 3 && (
        <ul>
          {results !== undefined && results.length > 0
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
