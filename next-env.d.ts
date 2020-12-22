/// <reference types="next" />
/// <reference types="next/types/global" />
import * as next from 'next'
import {Session} from "next-iron-session";

interface Post {
  id: string
  title: string
  date: string
  content?:string
}

declare module 'next'{
  interface NextApiRequest{
    session:Session
  }
}