import {NextApiHandler} from "next";
import SignIn from "../../../src/model/SignIn";
import withSession from "../../../lib/whitSession";

const Sessions: NextApiHandler = withSession(async (request, response) => {
  const signIn = new SignIn(request.body)
  response.setHeader('Content-type', 'application/json;charset=utf-8')
  await signIn.validate()
  if(signIn.hasError()){
    response.statusCode = 422
    response.json(signIn.errors)
  } else{
    request.session.set('currentUser',signIn.username)
    await request.session.save();
    response.statusCode = 200
    response.json(signIn.username)
  }
})

export default Sessions