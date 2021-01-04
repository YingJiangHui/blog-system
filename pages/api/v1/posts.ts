import {NextApiRequest,NextApiResponse} from 'next';
import {getPosts} from '../../../lib/posts';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import withSession from '../../../lib/whitSession';
import {User} from '../../../src/entity/User';
import {EntityManager} from 'typeorm/index';

export default withSession(async(req: NextApiRequest,res: NextApiResponse) => {
  const updatePosts = ():Promise<{manager:EntityManager,posts:Post}>=>{
    return new Promise(async(resolve, reject)=>{
      const {manager} = await getDatabaseConnection();
      const {title,content} = req.body;
      const posts = new Post();
      posts.title = title;
      posts.content = content;
      posts.validate()
      if(posts.hasError()){
        reject(posts.errors)
      }else {
        resolve({manager,posts})
      }
    })
  }
  
  const methodMap = {
    'GET': async() => {
      const posts = await getPosts();
      res.statusCode = 200;
      res.setHeader('Content-type','application/json');
      res.json(posts);
    },'POST': async() => {
      updatePosts().then(async ({manager,posts})=>{
        const username = req.session.get('currentUser');
        posts.author = await manager.findOne(User,{
          where: {
            username
          }
        });
        await manager.save(posts);
        res.json({posts:posts})
      },(errors)=>{
        res.statusCode = 422
        res.json(errors)
      })
    },'DELETE': async() => {
      const {manager} = await getDatabaseConnection();
      const body = req.body;
      res.statusCode = 200;
      await manager.delete(Post,body.id);
      res.json({postsId:body.id});
    },'PATCH':async()=>{
      updatePosts().then(async ({manager,posts})=>{
        const body = req.body;
        res.statusCode = 200
        await manager.createQueryBuilder().update(Post)
        .set({ title: posts.title, content: posts.content })
        .where("id = :id", { id: body.id })
        .execute();
        res.json({posts:posts});
      },(errors)=>{
        res.statusCode = 422
        res.json(errors)
      })
    }
  };
  await methodMap[req.method as 'GET'|'POST'|'DELETE'|'PATCH']();
});