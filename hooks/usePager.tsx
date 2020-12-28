import React, {useCallback, useEffect, useState} from 'react'
import Link from "next/link";
import _ from 'lodash'

interface Options{
  totalPage:number,
  currentPage:number,
  totalElement:number,
}

const usePaging = (options:Options)=>{
  const {totalPage,currentPage,totalElement} = options
  const xxx = useCallback(() =>
    [1].concat([-3,-2,-1,0,1,2,3].map((item)=>currentPage+item>1&&currentPage+item<totalPage?currentPage+item:-2)
    .filter((item)=>item!==-2)
    .concat([totalPage]))
    .reduce((a,b,index,arr)=>arr[index]-arr[index-1]>1?[...a,-1,b]:[...a,b],[])
    // .map((item)=>item===-1?'...':item)
    ,[currentPage])
  
  const [pageList,setPageList] = useState<number[]>()
  useEffect(()=>{
    setPageList(()=>xxx())
  },[currentPage])
  const paging = (
    <>
      {currentPage-1>0&&<Link href={`/posts?page=${currentPage-1}`}><a>上一页</a></Link>} {pageList?.map((pageNumber)=>pageNumber===-1?
      <Link href={'/'}><a>...</a></Link>:<Link href={`/posts?page=${pageNumber}`}><a>{pageNumber}</a></Link> )} {currentPage+1<=totalPage&& <Link href={`/posts?page=${currentPage+1}`}><a>下一页</a></Link>}
    </>
)
  return {paging}
}

export default usePaging