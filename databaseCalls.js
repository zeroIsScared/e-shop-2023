import {client} from './dataBaseClient.js';


export class databaseOperations {    

     findAll = async (tableName) => {
       await client.connect();
        const allItems = await client.query(`SELECT * FROM ${tableName};`);
        await client.end();
        return allItems;
    }
    
    
    }


