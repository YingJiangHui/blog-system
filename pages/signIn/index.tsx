import React, {FC, FormEvent, useCallback, useState, ChangeEvent, useEffect} from 'react'
import axios, {AxiosResponse} from "axios";
import {GetServerSideProps} from "next";
import withSession from "../../lib/whitSession";
import {User} from "../../src/entity/User";

interface Props {
  user:User
}

const SignIn: FC<Props> = (props) => {
  const {user} = props
  const [formData, setFormData] = useState({username: '', password: ''});
  const [errorInfo, setErrorInfo] = useState({username: [], password: []})
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/api/v1/sessions', formData).then(response => {
      console.log(response);
    }).catch(err => {
      const response: AxiosResponse = err.response
      const {data} = response
      setErrorInfo(data)
    });
  };
  
  const changeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData(({...formData,[e.target?.name]: e?.target?.value}))
  }, [formData])
  return (<div>
    <h1>登录成功当前用户为：{user}</h1>
    <form method="POST" onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">
          用户名: <input type="text" name='username' onChange={changeInput}/>
        </label>
        {errorInfo?.username?.length > 0 && <div>{errorInfo?.username?.join(',')}</div>}
      </div>
      <div>
        <label htmlFor="password">
          密码: <input type="password" name='password' onChange={changeInput}/>
        
        </label>
        {errorInfo?.password?.length > 0 && <div>{errorInfo?.password?.join(',')}</div>}
      </div>
      <div>
        <input type="submit" value='登录'/>
      </div>
    </form>
  </div>);
}

export default SignIn

// @ts-ignore
export const getServerSideProps: GetServerSideProps =  withSession(async (context) => {
  // @ts-ignore
  const user = context.req.session.get('currentUser')
  return {
    props:{
      user:JSON.parse(JSON.stringify(user))
    }
  }
})