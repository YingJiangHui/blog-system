import {NextApiRequest,NextApiResponse} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';

interface Errors {username:string[],password:string[],confirmPassword:string[]}
export default async (req:NextApiRequest, res:NextApiResponse) => {
  res.setHeader('Content-type','application/json;charset=utf-8')
  const {username,password,confirmPassword} = req.body
  const connection = await getDatabaseConnection()
  const {manager} = connection

  const user = new User()
  user.password = password;
  user.confirmPassword = confirmPassword
  user.username = username
  await user.validate()
  
  if(user.hasError()){
    res.statusCode = 422 //传入的参数请求都正确，就是不允许存入数据库
    res.json(user.errors)
  }else{
    await manager.save(user)
    res.statusCode = 200
    res.json(user)
  }
}