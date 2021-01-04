import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {User} from './User';
import {Comment} from './Comment';
interface Errors {title:string[],content:string[]}

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
  @ManyToOne((type:User) => User, (user:User) => user.posts)
  author: User;
  @OneToMany((type:Comment) => Comment, (comment:Comment) => comment.post)
  comments: Comment[];
  
  errors:Errors = {title:[],content:[]}
  
  validate(){
    const title = this.title.trim()
    const content = this.content.trim()

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

}