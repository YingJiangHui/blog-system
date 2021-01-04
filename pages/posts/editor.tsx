import React from 'react'
import {GetServerSideProps,NextPage} from 'next';
import useForm from "../../hooks/useForm";
import axios from "axios";
import qs from "querystring";
import exp from 'constants';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {Post} from '../../src/entity/Post';

interface Props {
  posts:{title:string,content:string,id:number}
}

const UpdatePosts: NextPage<Props> = (props) => {
  const {posts:{title,content,id}} = props
  const initFormData = {title, content}
  const {loading, form} = useForm<typeof initFormData>({
    fields: [
      {type: 'text', key: 'title', label: '博客名称',},
      {type: 'textarea', key: 'content', label: '博客内容'}
    ],
    submit: {
      onError: () => {
      },
      onSuccess: () => {
        if (window.confirm('跟新成功，点击跳转文章列表'))
          window.location.href = `/posts`
      },
      buttons: [
        <button type='submit'>更新博客</button>
      ],
      request: (formData) => axios.patch('/api/v1/posts', {...formData,id:id})
    },
    initFormData
  })
  return (<>
    {form}
    {loading && '博客更新中...'}
  </>)
}

export default UpdatePosts

const getServerSideProps:GetServerSideProps = async(context)=>{
  const query =  context.query
  const {manager} = await getDatabaseConnection()
  const posts = await manager.findOne(Post,{
    where:{
      id:query?.id
    }
  })
  return {
    props:{
      posts:JSON.parse(JSON.stringify(posts))
    }
  }
}

export {getServerSideProps}