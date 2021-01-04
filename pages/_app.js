import "../styles/globals.css"
import Head from "next/head"
import Link from "next/link"

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>makabaka blog site</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
        <header className="header">
          <div className="container">
            <div className="headerLeft">
              <ol>
                <li><Link href='/'><a>logo</a></Link></li>
                <li><Link href="/posts"><a>文章</a></Link></li>
                <li><Link href="/posts/new"><a>写文章</a></Link></li>
              </ol>
            </div>
            <div className={"headerRight"}>
              <ol>
                <li><Link href="/signUp"><a>注册</a></Link></li>
                <li><Link href="/signIn"><a>登录</a></Link></li>
              </ol>
            </div>
          </div>
        </header>
        <main className="main">
          <Component {...pageProps}/>
        </main>
        <footer className="footer">&copy;ying</footer>
      <style jsx>{`
        .main{
          flex-grow: 1;
        }
        .header{
          padding-top: 1em;         
          padding-bottom: 1em;         
          border-bottom: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
        }
        .header>.container{
         margin-right: 12em;
          margin-left: 12em;
          display:flex;
          justify-content: space-between;
        }
        .header ol{
          list-style: none;
          display: flex;
        }
        .header ol>li{
          margin-left: 1em;
        }
        .header ol>li:first-child{
          margin-left: 0;
        }
        .footer{
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
          border-top: 1px solid rgba(0,0,0,0.1);
          text-align: center;
          padding-bottom: 2em;
          padding-top: 1em;
        }
      `}</style>
    </>
  )
}

export default MyApp
