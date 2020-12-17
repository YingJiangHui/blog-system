import {Post} from "src/entity/Post";
import {User} from "src/entity/User";
import {Comment} from 'src/entity/Comment'
import {createConnection, getConnectionManager} from "typeorm";
import config from 'ormconfig.json'
const promise = (async () => {
  const manager = getConnectionManager()
  const connection = manager.has('default') && manager.get('default')
  if (connection) {
    await connection.close()
  }
  // @ts-ignore
  return createConnection({
    ...config,
    entities:[Post,Comment,User]
  })
})()

export const getDatabaseConnection = async () => {
  return promise
}