import {NextPage} from 'next';
import {FormEvent,useEffect,useState, ChangeEvent, useCallback} from 'react';
import axios,{AxiosResponse} from 'axios';

const signUp: NextPage = () => {
  const [formData,setFormData] = useState({username: '',password: '',confirmPassword: ''});
  const [errorInfo,setErrorInfo] = useState({username:[],password:[],confirmPassword:[]})
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/api/v1/signUp',formData).then(response => {
      const isSignUp = window.confirm('注册成功点击跳转页面')
      isSignUp?window.location.href = '/signIn':''
    }).catch(err => {
      const response:AxiosResponse = err.response
      const {data} = response
      setErrorInfo(data)
    });
  };
  const changeInput = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  },[formData])
  return (<div>
    <form method="POST" onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">
          用户名: <input type="text" name='username'
                      onChange={changeInput}/>
        </label>
        {errorInfo?.username?.length>0&&<div>{errorInfo?.username?.join(',')}</div>}
      </div>
      <div>
        <label htmlFor="password">
          密码: <input type="password" name='password'
                     onChange={changeInput}/>

        </label>
        {errorInfo?.password?.length>0&&<div>{errorInfo?.password?.join(',')}</div>}
      </div>
      <div>
        <label htmlFor="passwordConfirm">
          确认密码：<input type="password" name='confirmPassword' id='passwordConfirm'
                      onChange={changeInput}/>
        </label>
        {errorInfo?.confirmPassword?.length>0&&<div>{errorInfo?.confirmPassword?.join(',')}</div>}
      </div>
      <div>
        <input type="submit" value='注册'/>
      </div>
    </form>
  </div>);
};
export default signUp;