import {NextPage} from 'next';
import {FormEvent,useEffect,useState, ChangeEvent, useCallback} from 'react';
import axios,{AxiosResponse} from 'axios';
import useForm from "../../hooks/useForm";

const signUp: NextPage = () => {
  const initFormData = {username:'',password:'',confirmPassword:''}
  const {loading,form} = useForm<typeof initFormData>({
    fields:[
      {
        type:'text',
        key:'username',
        label:'用户名'
      },
      {
        type:'password',
        key:'password',
        label:'密码'
      },
      {
        type:'password',
        key:'confirmPassword',
        label:'确认密码'
      },
    ],
    initFormData:initFormData,
    submit:{
      onError:()=>{},
      onSuccess:()=>{
        const isSignUp = window.confirm('注册成功点击跳转页面')
        isSignUp?window.location.href = '/signIn':''},
      request:(formData)=>axios.post('api/v1/signUp',formData),
      buttons:[<button type='submit'>注册</button>]
    }
  })
  
  return (<div>
    {form}
    {loading&&'登录中'}
  </div>);
};
export default signUp;