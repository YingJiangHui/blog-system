import React from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {GetStaticProps,GetServerSideProps,NextPage,GetServerSidePropsContext} from 'next';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import axios from 'axios'
import Link from 'next/link';
import withSession from '../../lib/whitSession';

type Props = {
  post: Post,
  isControl:boolean
}

const postsShow: NextPage<Props> = (props) => {
  const {post,isControl} = props;
  const handleDelete = ()=>{
    axios.delete('/api/v1/posts',{
      data:{
        id: post.id
      }
    }).then((response)=>{
      window.location.href = '/posts'
    }).catch((err)=>{
      alert(err.response.data['message']||'删除失败')
    })
  }
  

  
  return (
    <div>
      <h1>{post?.title}</h1>
      <p>作者：{post.author.username}</p>
      {
        isControl&&<>
        <button onClick={handleDelete}>删除</button>
        <Link href={`/posts/${post.id}/editor`}>
        <a>编辑</a>
        </Link>
        </>
      }
      <article dangerouslySetInnerHTML={   {__html: post?.content}  } />
    </div>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext):Promise<{ props: {[key:string]:any}  }> => {
  const connection = await getDatabaseConnection()
  const {manager} = connection
  const post = await manager.findOne(Post,{
    where:{
      id:context.params.id
    },
    relations:['author'],
  })
  // @ts-ignore
  const currentUser = context.req.session.get('currentUser')
  return {
    props:{
      post:JSON.parse(JSON.stringify(post)),
      isControl: currentUser === post.author.username
    }
  }
})