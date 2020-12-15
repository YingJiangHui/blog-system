import "reflect-metadata";
import {createConnection} from "typeorm";
import { Post } from "./entity/Post";

createConnection().then(async connection => {
    const {manager} =  connection
    const p1 = manager.create(Post,{title:'第一篇博客',content:'这是第一篇博客的内容'})
    manager.save(p1)
    await connection.close()
}).catch(error => console.log(error));
