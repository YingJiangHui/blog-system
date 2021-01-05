import {NextApiRequest,NextApiResponse} from 'next';
import {getPosts} from '../../../lib/posts';
import {Post} from '../../../src/entity/Post';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import withSession from '../../../lib/whitSession';
import {User} from '../../../src/entity/User';

export default withSession(async(req: NextApiRequest,res: NextApiResponse) => {
  const GET = async() => {
    const posts = await getPosts();
    res.statusCode = 200;
    res.setHeader('Content-type','application/json');
    res.json(posts);
  };
  const POST = async() => {
    const {body} = req;
    const username = req.session.get('currentUser');
    const {manager} = await getDatabaseConnection();
    const post = new Post();
    post.title = body.title;
    post.content = body.content;
    post.author = await manager.findOne(User,{
      where: {
        username
      }
    });
    await post.validate(req.session.get('currentUser'));
    if (post.hasError()) {
      res.statusCode = 422;
      res.json(post.errors);
    } else {
      await manager.save(post);
      res.statusCode = 200;
      res.json({posts: post});
    }
  };
  const DELETE = async() => {
    const {manager} = await getDatabaseConnection();
    const body = req.body;
    const username = req.session.get('currentUser');
    const post = await manager.findOne(Post,{where: {id: body.id},relations: ['author']});
    post.validate(username)
    if(post.hasError()){
      res.statusCode = 400;
      res.json(post.errors);
    }else{
      await manager.delete(Post,body.id);
      res.statusCode = 200;
      res.json({postsId: body.id});
    }
  };
  const PATCH = async() => {
    const {manager} = await getDatabaseConnection();
    const body = req.body;
    const post = await manager.findOne(Post,{where:{id:body.id},relations:["author"]});
    post.title = body.title;
    post.content = body.content;
    post.validate(req.session.get('currentUser'));
    if (post.hasError()) {
      res.statusCode = 422;
      res.json(post.errors);
    } else {
      await manager.save(post);
      res.statusCode = 200;
      res.json({post: post});
    }
  };
  const methodMap = {GET,POST,DELETE,PATCH};
  await methodMap[req.method as 'GET'|'POST'|'DELETE'|'PATCH']();
});