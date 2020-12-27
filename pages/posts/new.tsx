import React from 'react'
import {NextPage} from "next";
import useForm from "../../hooks/useForm";
import axios from "axios";

interface Props {

}

const NewPosts: NextPage<Props> = (props) => {
  const initFormData = {title: '', content: ''}
  const {loading, form} = useForm<typeof initFormData>({
    fields: [
      {type: 'text', key: 'title', label: '博客名称',},
      {type: 'textarea', key: 'content', label: '博客内容'}
    ],
    submit: {
      onError: () => {
      },
      onSuccess: () => {
        if (window.confirm('创建成功，点击跳转文章列表'))
          window.location.href = `/posts`
      },
      buttons: [
        <button type='submit'>创建博客</button>
      ],
      request: (formData) => axios.post('/api/v1/posts', formData)
    },
    initFormData
  })
  return (<>
    {form}
    {loading && '博客创建中...'}
  </>)
}

export default NewPosts