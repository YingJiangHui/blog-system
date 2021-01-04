import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React from 'react';
import { NextPage} from "next";

import PostsPage,{getServerSideProps,Posts} from './posts';
const Home: NextPage<Posts> = (props) => {
  return (
    <div>
      <PostsPage {...props}/>
    </div>
  )
}
export default Home
export {getServerSideProps}