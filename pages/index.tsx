import type { NextPage } from 'next'
import Head from 'next/head'
import FamousPlace from '../components/FamousPlace'
import SearchBox from '../components/SearchBox'
import Test from '../components/Test'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
      <title>Weather App - Next</title>
      <link rel="apple-touch-icon" sizes="180x180" href="wheater.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="wheater.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="wheater.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#ffffff"/>
      </Head>

      <div className="home">
        <div className="container">
        <SearchBox placeholder="Search for a city..."/>
        <FamousPlace />
        <Test />
        </div>
      </div>
    </div>
  )
}

export default Home
