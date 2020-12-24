import styles from '../styles/Home.module.css'
import Link from 'next/link'
import axios from 'axios'
import {useEffect, useState} from 'react'
import usePosts from "../hooks/usePosts";
import {getPosts} from "../lib/posts";
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';

type Posts = {
  posts: Post[]
}

const Home: NextPage<Posts> = (props) => {
  const {posts} = props
  return (
    <div className={styles.container}>
      <a href="/signUp">注册</a>
      <a href="/signIn">登入</a>
      <h1>文章列表</h1>
      <ul>
        {
          posts?.map((post) =>
            <li key={post.id}>
              <Link href="/posts?[id]" as={`/posts/${post.id}`}>
                <a>
                  {post.title}
                </a>
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Home
export const getServerSideProps: GetServerSideProps =  async (context) => {
  const connection = await getDatabaseConnection()
  const {manager} = connection
  const posts = await manager.find(Post)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}