import Link from 'next/link'
import {GetServerSideProps, NextPage} from "next";
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';

type Posts = {
  posts: Post[]
}

const PostsPage: NextPage<Posts> = (props) => {
  const {posts} = props
  return (
    <div>
      <h1>文章列表</h1>
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
    </div>
  )
}

export default PostsPage
export const getServerSideProps: GetServerSideProps =  async (context) => {
  const connection = await getDatabaseConnection()
  const {manager} = connection
  const posts = await manager.find(Post)
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}