import {NextApiRequest,NextApiResponse} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {User} from '../../../src/entity/User';
import md5 from 'md5'
interface Errors {username:string[],password:string[],confirmPassword:string[]}
export default async (req:NextApiRequest, res:NextApiResponse) => {
  const errors:Errors = {username:[],password:[],confirmPassword:[]}
  const {username,password,confirmPassword} = req.body
  const connection = await getDatabaseConnection()
  const {manager} = connection
  if(username.trim() ===''){
    errors.username.push('请输入用户名')
  }
  if (!/[a-zA-Z0-9]/.test(username.trim())) {
    errors.username.push('格式不合法');
  }
  if (username.trim().length > 18) {
    errors.username.push('太长');
  }
  if (username.trim().length < 6) {
    errors.username.push('太短');
  }
  if(password.trim() ===''){
    errors.username.push('请输入密码')
  }
  if(confirmPassword.trim() === ''){
    errors.confirmPassword.push('请确认密码')
  }
  if(password!==confirmPassword){
    errors.confirmPassword.push('两次密码不相同')
  }
  const users = await manager.find(User,{where:{username:username.trim()}})
  if(users.length>0){
    errors.username.push('用户名存在')
  }
  res.setHeader('Content-type','application/json;charset=utf-8')
  const isError = Object.values(errors).filter(item=>item.length>0).length>0
  if(isError){
    res.statusCode = 422 //传入的参数请求都正确，就是不允许存入数据库
    res.json(errors)
  }else{
    const user = new User()
    user.username = username
    user.passwordDigest = md5(password)
    await manager.save(user)
    res.statusCode = 200
    res.json(user)
  }
}