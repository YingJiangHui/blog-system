import Link from 'next/link';
import {GetServerSideProps,NextPage} from 'next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import qs from 'querystring';
import usePaging from '../../hooks/usePager';
import React from 'react';

export type Posts = {
  posts: Post[],totalPage: number,totalElement: number;currentPage: number
}

const PostsPage: NextPage<Posts> = (props) => {
  const {posts,totalPage,totalElement,currentPage} = props;
  const {paging} = usePaging({totalElement,currentPage,totalPage});
  return (<div>
      <h1>文章列表2{currentPage}/{totalPage}</h1>
      <div className="article-list">
        <ol>
          {posts?.map((post) => <li key={post.id}>
            <Link href="/posts/[id].js" as={`/posts/${post.id}`}>
              <a>
                {post.title}
              </a>
            </Link>
          </li>)}
        </ol>
      </div>
      <div className="paging-buttons">
        {paging}
      </div>
      <style jsx>{`
        .paging-buttons{
          display:flex;
          justify-content: flex-end;
        }
        .article-list{
          padding: 2em 3em;
        }
        .article-list>ol>li{
          font-size: 17px;
          line-height: 1.7;
        }
        .article-list>ol>li>a{
          border-bottom: 1px solid rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  
  );
};

export default PostsPage;
export const getServerSideProps: GetServerSideProps = async(context) => {
  const connection = await getDatabaseConnection();
  const {manager} = connection;
  const prePost = 10;
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index + 1);
  const query = qs.parse(search).page?.toString() || '1';
  const page = parseInt(query);
  const [posts,count] = await manager.findAndCount(Post,{
    skip: (page - 1) * prePost,take: prePost
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),totalPage: Math.ceil(count / prePost),totalPosts: count,currentPage: page
    }
  };
};