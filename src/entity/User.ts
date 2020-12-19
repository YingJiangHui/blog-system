// @ts-ignore
import {BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Post} from './Post';
import {Comment} from './Comment';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
// @ts-ignore
import md5 from 'md5'

type Errors = { username: string[], password: string[], confirmPassword: string[] }

@Entity('users')
export class User  {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column('varchar')
  username: string;
  @Column('varchar')
  passwordDigest: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany((type: Post) => Post, (post: Post) => post.author)
  posts: Post[];
  @OneToMany((type:Comment) => Comment, (comment:Comment) => comment.user)
  comments: Comment[]
  
  password: string
  confirmPassword: string
  errors: Errors = {username: [], password: [], confirmPassword: []}
  
  async validate() {
    if (this.username.trim() === '') {
      this.errors.username.push('请输入用户名')
    }
    if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
      this.errors.username.push('格式不合法');
    }
    if (this.username.trim().length > 18) {
      this.errors.username.push('太长');
    }
    if (this.username.trim().length < 6) {
      this.errors.username.push('太短');
    }
    if (this.password.trim() === '') {
      this.errors.password.push('请输入密码')
    }
    if (this.confirmPassword.trim() === '') {
      this.errors.confirmPassword.push('请确认密码')
    }
    if (this.password !== this.confirmPassword) {
      this.errors.confirmPassword.push('两次密码不相同')
    }
    const users = await (await getDatabaseConnection()).manager.findOne(User, {where: {username: this.username.trim()}})
    if (users) {
      this.errors.username.push('用户名存在')
    }
  }
  
  hasError() {
    return Boolean(Object.values(this.errors).find((item) => item.length > 0))
  }
  
  @BeforeInsert()
  insertPasswordDigest() {
    this.passwordDigest = md5(this.password)
  }
}