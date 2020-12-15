import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id:number
  @Column('int')
  userId:number
  @Column('int')
  postId:number
  @Column('text')
  comment:string
}
