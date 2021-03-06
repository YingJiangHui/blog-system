import React, {useEffect} from 'react'
import {ChangeEvent, FormEvent, useMemo, useState} from "react";
import {AxiosResponse} from "axios";
type Field<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea',
  key: keyof T
}

interface UseFormProps<T> {
  initFormData: T;
  fields:Array<Field<T>>
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>,
    onSuccess?: (response:AxiosResponse<T>) => void,
    onError?: (err:any) => void
    buttons:React.ReactChild[]
  }
}

function useForm<T>(props:UseFormProps<T>) {
  const {initFormData,fields,submit} = props
  const [formData, setFormData] = useState(initFormData);
  const [errors,setErrors] = useState(()=>{
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) { // 为了严谨
        e[key] = [];
      }
    }
    console.log(e);
    return e
  })
  const [loading,setLoading] = useState(false)
  const onSubmit = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(true)
    submit.request(formData).then((response)=>{
      setLoading(false)
      submit.onSuccess(response)
      console.log(response)
    },(err)=>{
      setLoading(false)
      if(err.response.status === 422){
        setErrors(err.response.data)
      }else if(err.response.status === 401){
        if(window.confirm('用户登录，点击跳转登录页面')){
          window.location.href = `/sign_in?returnTo=${encodeURIComponent(window.location.pathname)}`;
        }
      }
      submit.onError(err)
    })
  }
  const onChange = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    console.log(e.target.name,e.target.value)
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const form = useMemo(()=>(
    <form onSubmit={onSubmit}>
      {
        fields.map((field)=>(
          <div key={field.key.toString()}>
            <label htmlFor={field.label}>
              {field.label}：
              {
                field.type ==='textarea'?
                <textarea name={field.key.toString()} onChange={onChange} defaultValue={formData[field.key].toString()}/>:
                <input type={field.type} name={field.key.toString()} defaultValue={formData[field.key].toString()} onChange={onChange}/>
              }
            </label>
            <div>{
              errors[field.key].join(',')
            }</div>
          </div>
        ))
      }
      {submit.buttons}
    </form>
  ),[formData,errors,onSubmit])
  
  return {form,loading}
}


export default useForm