import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import PostsPage,{getServerSideProps} from './posts/index'
type Posts = {
  posts: Post[]
}

const Home: NextPage<Posts> = (props) => {
  const {posts} = props
  return (
    <div className={styles.container}>
      <a href="/signUp">注册</a>
      <a href="/signIn">登录</a>
        <PostsPage posts={posts}/>
    </div>
  )
}

export default Home
export {getServerSideProps}