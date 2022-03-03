import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Router from 'next/router'


function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   const start = () => NProgress.start();
  //   const end = () => NProgress.done();

  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeStart", end);
  //   Router.events.on("routeChangeError", end);

  //   return () => {

  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeStart", end);
  //     Router.events.off("routeChangeError", end);
  //   }
  // }, [])

  return <Component {...pageProps} />
}

export default MyApp
