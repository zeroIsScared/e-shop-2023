import { databaseOperations } from "../databaseCalls.js"

const dO = new databaseOperations();

export const checkSessionCorespondsToId= async (tableName, req)=> {
    const sessionId = req.query.session_id;

    const sessionIdQuery = await dO.findByValue(tableName,req);
    console.log(sessionIdQuery.rows[0]);
    const result = sessionId !== undefined && sessionIdQuery.rows[0].client_id == req.params.id;
    console.log(result);
    return result;
}

export const showOnlyIdName = (queryResult) =>{
return {id: queryResult.rows[0].id,
    name: queryResult.rows[0].name}
} 

export const notAuthorised =( reply )=>{
    reply.
    code(401).
        send(`Not authorised`); 
}