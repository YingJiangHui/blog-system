import React, {FC, FormEvent, useCallback, useState, ChangeEvent, useEffect} from 'react'
import axios, {AxiosResponse} from "axios";

interface Props {

}

const SignIn: FC<Props> = (props) => {
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