import '../styles/globals.css'
import Head from "next/head";
import Link from "next/link"

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Link href='/'><a>返回首页</a></Link>
      <Component {...pageProps}/>
    </>
  )
}

export default MyApp
