
import React from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {GetServerSideProps, GetStaticProps, NextPage} from 'next';

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

export const getServerSideProps:GetServerSideProps = async(content)=>{
  const {id} = content.query
  const post = await getPost(id as string)
  return {
    props:{
      post
    }
  }
}