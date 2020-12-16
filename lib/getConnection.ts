import {createConnection, getConnectionManager } from "typeorm";

export const getConnection = async ()=>{
  const connectionManager =  getConnectionManager()
  if(connectionManager.has('default')){
    if(connectionManager.get('default').isConnected){
      return connectionManager.get('default')
    }else{
      return createConnection()
    }
  }else{
    return createConnection()
  }
}