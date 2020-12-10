
import React from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {GetStaticProps, NextPage} from 'next';

type Props = {
  post: Post
}
const postsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <div>
      <h1>{post?.title}</h1>
      <article dangerouslySetInnerHTML={   {__html: post?.content}  }>
      </article>
    </div>
  );
};

export default postsShow;

export const getStaticPaths = async()=>{
  const idList = await getPostIds()
  return {
    paths:idList.map(id=>({params:{id:id}})),
    fallback:true
  }
}

export const getStaticProps:GetStaticProps = async(propsContent)=>{
  const {id} = propsContent.params
  const post = await getPost(id as string)
  return {
    props:{
      post
    },
  }
}