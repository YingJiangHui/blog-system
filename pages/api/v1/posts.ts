import {NextApiRequest,NextApiResponse} from 'next';
import {getPosts} from '../../../lib/posts';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import withSession from '../../../lib/whitSession';
import {User} from '../../../src/entity/User';

export default withSession(async(req: NextApiRequest,res: NextApiResponse) => {
  const methodMap = {
    'GET': async() => {
      const posts = await getPosts();
      res.statusCode = 200;
      res.setHeader('Content-type','application/json');
      res.json(posts);
    },'POST': async() => {
      const {manager} = await getDatabaseConnection();
      const {title,content} = req.body;
      const posts = new Post();
      posts.title = title;
      posts.content = content;
      posts.validate()
      if(posts.hasError()){
        res.statusCode = 422
        res.json(posts.errors)
      }else{
        const username = req.session.get('currentUser');
        posts.author = await manager.findOne(User,{
          where: {
            username
          }
        });
        await manager.save(posts);
        res.statusCode = 200;
        res.json(posts);
      }
    },'DELETE': async() => {
      const {manager} = await getDatabaseConnection();
      const body = req.body;
      res.statusCode = 200;
      await manager.delete(Post,body.id);
      res.json({postsId:body.id});
    }
  };
  await methodMap[req.method as 'GET'|'POST'|'DELETE']();
});