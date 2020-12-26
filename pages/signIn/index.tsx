import React, {FC, FormEvent, useCallback, useState, ChangeEvent, useEffect} from 'react'
import axios, {AxiosResponse} from "axios";
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import withSession from "../../lib/whitSession";
import {User} from "../../src/entity/User";
import useForm from "../../hooks/useForm";

interface Props {
  user: User
}

const SignIn: FC<Props> = (props) => {
  const {form,loading} = useForm<{username:string,password:string}>({
    initFormData: {
      username: '',
      password: ''
    },
    fields:[
      {
        type:'text',
        key:'username',
        label: "用户名",
      },
      {
        type:'password',
        key:'password',
        label: "密码",
      }
    ],
    submit:{
      onSuccess:(response)=>{
        console.log(response);
      },
      onError:()=>{},
      request: (formData)=> axios.post('/api/v1/sessions',formData),
      buttons:[<button type='submit'>提交</button>]
    },
  })
  const {user} = props
  return (<div>
    <h1>登录成功当前用户为：{user}</h1>
    {form}
  </div>);
}
export default SignIn

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext):Promise<{ props: {[key:string]:any}  }> => {
  // @ts-ignore
  const user = context.req.session.get('currentUser')
  return {
    props: {
      user: JSON.parse(JSON.stringify(user||''))
    }
  }
})