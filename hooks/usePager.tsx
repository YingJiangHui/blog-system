import React,{useCallback,useEffect,useState} from 'react';
import Link from 'next/link';
import _ from 'lodash';

interface Options {
  totalPage: number,
  currentPage: number,
  totalElement: number,
}

const usePaging = (options: Options) => {
  const {totalPage,currentPage,totalElement} = options;
  const constrPagingButton = useCallback(() => _.union([1].concat([-3,-2,-1,0,1,2,3].map((item) => currentPage + item > 1 && currentPage + item < totalPage ? currentPage + item : -2).concat([totalPage]))).sort().filter((item) => item !== -2).reduce((a,b,index,arr) => arr[index] - arr[index - 1] > 1 ? [...a,-1,b] : [...a,b],[]),[currentPage]);
  
  const [pageList,setPageList] = useState<number[]>();
  useEffect(() => {
    setPageList(() => constrPagingButton());
  },[currentPage]);
  const paging = (<>
    <ol className='changePaging'>
      <li>{currentPage - 1 > 0 && <Link href={`/posts?page=${currentPage - 1}`}><a>上一页</a></Link>}</li>
      {pageList?.map((pageNumber) => <li>{pageNumber === -1 ? <Link href={'/'}><a>...</a></Link> :
        <Link href={`/posts?page=${pageNumber}`}><a>{pageNumber}</a></Link>}</li>)}
      <li>{currentPage + 1 <= totalPage && <Link href={`/posts?page=${currentPage + 1}`}><a>下一页</a></Link>}</li>
    </ol>
    <style jsx>{`
      .changePaging{
        list-style: none;
        display:flex;
      }
      .changePaging>li{
        margin-left: 0.2em;
        margin-right: 0.2em;
      }
      .changePaging>li:first-child,.changePaging>li:last-child{
        margin: 0;
      }
    `}</style>
  </>);
  return {paging};
};

export default usePaging;