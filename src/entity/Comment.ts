import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";
import _  from 'lodash'
interface Error {
  content:string[],
  message:string[]
}

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id:number
  @Column('text')
  content:string
  @CreateDateColumn()
  createdAt:Date
  @UpdateDateColumn()
  updatedAt:Date
  
  @ManyToOne("User",'comments')
  user:User
  @ManyToOne("Post",'comments')
  post:Post
  
  errors:Error = {content:[],message:[]}
  
  validate = async()=>{
    if(this.content.trim() ===''){
      this.errors.content.push('评论不可为空')
    }
  }
  hasError = ()=>{
    return Boolean(Object.values(this.errors).find(item=>item.length>0))
  }
  toJSON=()=>{
    return _.omit(this,['errors'])
  }
}
