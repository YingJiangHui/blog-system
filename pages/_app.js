import '../styles/globals.css'
import Head from "next/head";
import Link from "next/link"

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>makabaka blog site</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Link href='/'><a>logo</a></Link>
      <Component {...pageProps}/>
    </>
  )
}

export default MyApp
