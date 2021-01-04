import React from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {GetStaticProps,GetServerSideProps, NextPage} from 'next';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import axios from 'axios'
import Link from 'next/link';

type Props = {
  post: Post
}

const postsShow: NextPage<Props> = (props) => {
  const {post} = props;
  const handleDelete = ()=>{
    axios.delete('/api/v1/posts',{
      data:{
        id: post.id
      }
    }).then((response)=>{
      window.location.href = '/posts'
    }).catch((err)=>{
      console.log(err)
    })
  }
  

  
  return (
    <div>
      <h1>{post?.title}</h1>
      <a onClick={handleDelete}>删除文章</a>
      <Link href={`/posts/editor?id=${post.id}`}>
        <a >编辑文章</a>
      </Link>
      <article dangerouslySetInnerHTML={   {__html: post?.content}  } />
    </div>
  );
};

export default postsShow;

export const getServerSideProps:GetServerSideProps<any,{id:string}> = async(context)=>{
  const connection = await getDatabaseConnection()
  const {manager} = connection
  const post = await manager.findOne(Post,context.params.id)
  return {
    props:{
      post:JSON.parse(JSON.stringify(post))
    }
  }
}