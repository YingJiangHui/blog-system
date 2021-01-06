import {NextApiRequest,NextApiResponse} from 'next';
import withSession from '../../../lib/whitSession';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {Post} from '../../../src/entity/Post';
import {Comment} from '../../../src/entity/Comment';
import {User} from '../../../src/entity/User';

export default withSession(async(req: NextApiRequest,res: NextApiResponse) => {
  const POST = async() => {
    const {body} = req;
    const {manager} = await getDatabaseConnection();
    const post = await manager.findOne(Post,{where: {id: body.postId},relations: ['comments','author']});
    const user = await manager.findOne(User,{where: {id: body.userId}});
    
    const comment = new Comment();
    comment.content = body.content;
    comment.post = body.postId;
    comment.user = body.userId;
    await comment.validate();
    if (comment.hasError()) {
      req.statusCode = 422;
      res.json(comment.errors);
    } else {
      await manager.save(comment);
      post.comments.push(comment);
      await manager.save(post);
      req.statusCode = 200;
      res.json(comment);
    }
  };
  const DELETE = async() => {
    const {body} = req;
    const {manager} = await getDatabaseConnection();
    const result = await manager.delete(Comment,body.commentId);
    const messages = [()=>{
      req.statusCode = 200;
      return '重复删除'
    },()=>{
      req.statusCode = 200;
      return '删除成功'
    },()=>{
      req.statusCode = 422
      return '删除失败'
    }];
    res.json(messages[result.affected||3]());
  };
  const methodMap = {POST,DELETE};
  await methodMap[req.method as 'POST'|'DELETE']();
});