import {NextPage} from 'next';
import {FormEvent,useEffect,useState} from 'react';
import axios,{AxiosResponse} from 'axios';

const signUp: NextPage = () => {
  const [formData,setFormData] = useState({username: '',password: '',confirmPassword: ''});
  const [errorInfo,setErrorInfo] = useState({username:[],password:[],confirmPassword:[]})
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/api/v1/signUp',formData).then(response => {
      console.log(response);
    }).catch(err => {
      const response:AxiosResponse = err.response
      const {data} = response
      setErrorInfo(data)
    });
  };
  return (<div>
    <form method="POST" onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">
          用户名: <input type="text" name='username'
                      onChange={(e) => setFormData({...formData,username: e?.target?.value})}/>
        </label>
        {errorInfo.username.length>0&&<div>{errorInfo.username.join(',')}</div>}
      </div>
      <div>
        <label htmlFor="password">
          密码: <input type="password" name='password'
                     onChange={(e) => setFormData({...formData,password: e.target.value})}/>

        </label>
        {errorInfo.password.length>0&&<div>{errorInfo.password.join(',')}</div>}
      </div>
      <div>
        <label htmlFor="passwordConfirm">
          确认密码：<input type="password" name='passwordConfirm' id='passwordConfirm'
                      onChange={(e) => setFormData({...formData,confirmPassword: e.target.value})}/>
        </label>
        {errorInfo.confirmPassword.length>0&&<div>{errorInfo.confirmPassword.join(',')}</div>}
      </div>
      <div>
        <input type="submit" value='注册'/>
      </div>
    </form>
  </div>);
};
export default signUp;