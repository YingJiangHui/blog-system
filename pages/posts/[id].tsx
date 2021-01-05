import React,{useCallback} from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {GetStaticProps,GetServerSideProps,NextPage,GetServerSidePropsContext} from 'next';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import axios from 'axios'
import Link from 'next/link';
import withSession from '../../lib/whitSession';
import useForm from '../../hooks/useForm';
import {log} from 'util';
import {User} from '../../src/entity/User';

type Props = {
  post: Post,
  selfPost:boolean,
  currentUserId:number
}

const postsShow: NextPage<Props> = (props) => {
  const {post,selfPost,currentUserId} = props;
  const initFormData = {content:''}
  const {form,loading} = useForm<typeof initFormData>({
    fields:[{type:'textarea',key:'content',label:'评论内容'}],
    submit:{
      request:(formData)=>axios.post(`/api/v1/comments`,{...formData,postId:post.id,userId:currentUserId}),
      onSuccess:(response)=>{
        console.log(response);
      },
      onError:(error)=>{
        console.log(error);
      },
      buttons:[<button type='submit'>提交评论</button>]
    },
    initFormData
  })
  const handleDeletePost = ()=>{
    axios.delete('/api/v1/posts',{
      data:{
        id: post.id
      }
    }).then((response)=>{
      window.location.href = '/posts'
    }).catch((err)=>{
      console.log(err.response)
      alert(err.response.data['message']||'删除失败')
    })
  }
  
  const handleDeleteComment= useCallback(function(commentId:number) {
    axios.delete(`/api/v1/comments`,{
      data:{
        commentId
      }
    }).then(()=>{
      alert('删除成功')
    },(error)=>{
      alert('删除失败')
    })
  },[])
  
  return (
    <div>
      <h1>{post?.title}</h1>
      <p>作者：{post.author.username}</p>
      {
        selfPost&&<>
        <button onClick={handleDeletePost}>删除</button>
        <Link href={`/posts/${post.id}/editor`}>
        <a>编辑</a>
        </Link>
        </>
      }
      <article dangerouslySetInnerHTML={   {__html: post?.content}  } />
      <h3>评论区</h3>
      <div className="add-comments">
        {form}
      </div>
      <div className="comments">
        <ul>
        {
          post.comments.map(comment=>
            <>
              <li className="comment">
                 <p><span>{comment.user.username}</span>：{comment.content}</p> {comment.user.id === currentUserId&&<button onClick={useCallback(()=>handleDeleteComment(comment.id),[comment.id])}>删除</button>}
              </li>
            </>)
        }
        </ul>
      </div>
      <style jsx>{`
        .comment{
          padding: 1em ;
          border-bottom:1px solid #d3d3d3;
        }
      `}</style>
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
    relations:['author','comments','comments.user'],
  })
  // @ts-ignore
  const username = context.req.session.get('currentUser')
  const user = await manager.findOne(User,{
    where:{
      username
    }
  })
  return {
    props:{
      post:JSON.parse(JSON.stringify(post)),
      selfPost: username === post.author.username,
      currentUserId:user.id
    }
  }
})