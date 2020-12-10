import Link from 'next/link'
const FirstPost = () => {
  return (<>
    <h1>first post</h1>
    <Link href='/'>
      <a>home</a>
    </Link>
  </>)
}
export default FirstPost