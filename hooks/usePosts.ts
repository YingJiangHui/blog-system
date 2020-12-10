import {useEffect, useState} from "react";
import axios from "axios";

export default ()=>{
  const [postsList, setPostList] = useState<Post[]>()
  const [loading,setLoading] = useState<boolean>(false)
  const [isEmpty,setIsEmpty] = useState<boolean>(false)
  useEffect(() => {
    setLoading(true)
    axios.get('/api/v1/posts').then((response) => {
      setPostList(response.data)
      setLoading(false)
      if(response.data.length===0){
        setIsEmpty(true)
      }
    },()=>{
      setLoading(false)
    })
    
  }, [])
  return {postsList,setPostList,loading,setLoading,isEmpty,setIsEmpty}
}