import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {User} from './User';
import {Comment} from './Comment';
import _ from 'lodash'
interface Errors {title:string[],content:string[],message:string[]}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  title: string;
  @Column('text')
  content: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne('User', 'posts')
  author: User;
  @OneToMany('Comment','post')
  comments: Comment[];
  
  errors:Errors = {title:[],content:[],message:[]}
  
  validate(currentUsername:string){
    const title = this.title.trim()
    const content = this.content.trim()
    if(currentUsername !== this.author.username){
      this.errors.message.push('权限不足')
    }
    if (title===''){
      this.errors.title.push('文章名称不可为空')
    }
    if(content===''){
      this.errors.content.push('文章内容不可为空')
    }
  }

  hasError() {
    return Boolean(Object.values(this.errors).find((item) => item?.length > 0))
  }
  toJSON(){return _.omit(this,['errors'])}
}