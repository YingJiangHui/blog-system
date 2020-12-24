// @ts-ignore
import { withIronSession } from 'next-iron-session'
import {NextApiHandler} from "next";

export default function withSession(handler:NextApiHandler) {
  return withIronSession(handler, {
    password: "4d5057cc-653f-4e18-b1f4-11dc0ff775bb",
    cookieName: 'blog',
    // password: process.env.SECRET_COOKIE_PASSWORD,
    // cookieName: 'next.js/examples/with-iron-session',
    cookieOptions:{
      secure:false
    }
  })
}