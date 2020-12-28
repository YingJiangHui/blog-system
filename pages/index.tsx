import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
type Posts = {
  posts: Post[];
  totalPage:number,
  totalPosts:number;
  currentPage:number
}

const Home: NextPage<Posts> = (props) => {
  return (
    <div className={styles.container}>
      <a href="/signUp">注册</a>
      <a href="/signIn">登录</a>
      <a href="/posts?page=1">文章列表</a>
    </div>
  )
}

export default Home
