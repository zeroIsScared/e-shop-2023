import {client} from './dataBaseClient.js';


export class databaseOperations {    

     findAll = async (tableName) => {
      
        const allItems = await client.query(`SELECT * FROM ${tableName};`);
        
        return allItems;
    }

    findById= async(tableName, id)=>{
      
      const item = await client.query(`SELECT * FROM ${tableName} WHERE id=$1;`, [id]);
      
        return item;
    }

    updateItem = async (tableName, req)=>{
      
      const reqItems=  Object.entries(req.body);
      let newValues = [];
      reqItems.forEach(item => {

        if(item !== req.body.phone){
            newValues.push(`${item[0]} ='${item[1]}'`);
            
        } else {
            newValues.push(item[0] =Number(item[1]));
        }
      }); 
     
      const res= await client.query(`UPDATE ${tableName} SET ${newValues} WHERE id = $1;`,[req.params.id]);
      console.log(res)
      
    }
    
    findByValue= async(tableName, req)=>{
      const [queryParam] = Object.keys(req.query);
      const value = req.query.session_id;
      console.log(value);
      
    const item = await client.query(`SELECT * FROM ${tableName} WHERE ${queryParam}= $1;`,[value]);
      
        return item;
    }

    createclient = async(tableName, reqBody) => {

      const columnNames = Object.keys(reqBody);            
      const values= Object.values(reqBody); 
      await client.query(`INSERT INTO ${tableName} (${columnNames[0]}, ${columnNames[1]}, ${columnNames[2]},
         ${columnNames[3]}, ${columnNames[4]}) VALUES ('${values[0]}', '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}');`)

    }

    deleteById = async (tableName, req) => {
      const result = await client.query(`DELETE FROM ${tableName} WHERE id = $1`,[req.params.id]);
      console.log(result);
   }

   deleteBySessionId = async (tableName, req) => {
    return  await client.query(`DELETE FROM ${tableName} WHERE session_id = $1`,[req.body.session_id]);
   
 }

    
    }


