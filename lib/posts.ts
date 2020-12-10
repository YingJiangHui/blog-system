import path from "path";
import fs, {promises as fsPromise} from "fs";
import matter from 'gray-matter'
import {file} from "@babel/types";
const markdownDir = path.join(process.cwd(), 'markdown')// current working dir

export const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir)
  const posts = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/g, '')
      const blogData = matter(fs.readFileSync(path.join(markdownDir, fileName), 'utf-8'))
      return {id, date: blogData.data.date, title: blogData.data.title}
    }
  )
  return posts
}

export const getPost = async (id: string) => {
  const fullPath = path.join(markdownDir, id+'.md')
  const post = matter(fs.readFileSync(fullPath, 'utf-8'))
  return JSON.parse(JSON.stringify({id, date: post.data.date, title: post.data.title, content: post.content}))
}

export const getPostIds = async () => {
  const fileNames = await fsPromise.readdir(markdownDir);
  return fileNames.map(fileName => fileName.replace(/\.md$/g, ''));
};