import Link from 'next/link'
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import qs from 'querystring'

type Posts = {
  posts: Post[],
  totalPage:number,
  totalPosts:number;
  currentPage:number
}

const PostsPage: NextPage<Posts> = (props) => {
  const {posts,totalPage,totalPosts,currentPage} = props
  
  return (
    <div>
      <h1>文章列表{currentPage}/{totalPage}</h1>
      <ul>
        {
          posts?.map((post) =>
            <li key={post.id}>
              <Link href="/posts?[id]" as={`/posts/${post.id}`}>
                <a>
                  {post.title}
                </a>
              </Link>
            </li>
          )
        }
      </ul>
      {currentPage-1>0&&<Link href={`/posts?page=${currentPage-1}`}><a>上一页</a></Link>} {currentPage+1<=totalPage&& <Link href={`/posts?page=${currentPage+1}`}><a>下一页</a></Link>}
    </div>
  )
}

export default PostsPage
export const getServerSideProps: GetServerSideProps =  async (context) => {
  const connection = await getDatabaseConnection()
  const {manager} = connection
  const prePost = 3
  const index = context.req.url.indexOf('?')
  const search = context.req.url.substr(index+1)
  const query = qs.parse(search).page?.toString()||'1'
  const page = parseInt(query)
  const [posts,count] = await manager.findAndCount(Post,{
    skip: (page-1)*prePost,
    take:prePost
  })
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      totalPage: Math.ceil(count/prePost),
      totalPosts:count,
      currentPage:page
    }
  }
}