import { withIronSession } from 'next-iron-session'
import {GetServerSideProps, GetServerSidePropsContext, NextApiHandler} from "next";
export default function withSession(handler:NextApiHandler|GetServerSideProps) {
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions:{
      secure:false
    }
  })
}