import styles from '../styles/Home.module.css'
import Link from 'next/link'
import axios from 'axios'
import {useEffect, useState} from 'react'
import usePosts from "../hooks/usePosts";
import {getPosts} from "../lib/posts";
import {NextPage} from "next";

type Posts = {
  posts:Post[]
}
const Home:NextPage<Posts> = (props)=> {
  const {posts} = props
  console.log(posts)
  return (
    <div className={styles.container}>
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
      <ul>
        {
          posts?.map((post) =>
            <li key={post.id}>
              <Link href="/blog?[id]" as={`/blog/${post.id}`}>
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
export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: {posts:JSON.parse(JSON.stringify(posts))},
  }
}
