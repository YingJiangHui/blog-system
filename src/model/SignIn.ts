import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import { User } from "src/entity/User";
import md5 from "md5";

class SignIn {
  username:string
  password:string
  errors:{username:string[],password:string[]} = {username:[],password:[]}
  
  constructor(user:{username:string,password:string}) {
    console.log(user)
    const {username,password} = user
    this.username = username
    this.password = password
  }
  
  async validate(){
    const {manager} = await getDatabaseConnection()
    const user = await manager.findOne(User,{
      where:{
        username:this.username
      }
    })
    if(user){
      if(md5(this.password) === user.passwordDigest){
      
      }else{
        this.errors.password.push('密码错误')
      }
    }else{
      this.errors.username.push('用户名不存在')
    }
  }
  
  hasError(){
    return Boolean(Object.values(this.errors).find((item) => item.length > 0))
  }
  
}

export default SignIn