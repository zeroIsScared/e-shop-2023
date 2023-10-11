import {client} from './dataBaseClient.js';


 const dbCalls = (client) => {

const findAll = async (tableName) => {
      
        const allItems = await client.query(`SELECT * FROM ${tableName};`);
        
        return allItems;
    }

   const  findById= async(tableName, id)=>{
      
      const item = await client.query(`SELECT * FROM ${tableName} WHERE id=$1;`, [id]);
      
        return item;
    }

    const updateItem = async (tableName, req)=>{
      
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
    
    const findByValue= async(tableName, req)=>{
      const [queryParam] = Object.keys(req.query);
      const value = req.query.session_id;
      console.log(value);
      
    const item = await client.query(`SELECT * FROM ${tableName} WHERE ${queryParam}= $1;`,[value]);
      
        return item;
    }

    const createclient = async(tableName, reqBody) => {

      const columnNames = Object.keys(reqBody);            
      const values= Object.values(reqBody); 
      await client.query(`INSERT INTO ${tableName} (${columnNames[0]}, ${columnNames[1]}, ${columnNames[2]},
         ${columnNames[3]}, ${columnNames[4]}) VALUES ('${values[0]}', '${values[1]}', '${values[2]}', '${values[3]}', '${values[4]}');`)

    }

   const  deleteById = async (tableName, req) => {
      const result = await client.query(`DELETE FROM ${tableName} WHERE id = $1`,[req.params.id]);
      console.log(result);
   }

  const  deleteBySessionId = async (tableName, req) => {
    return  await client.query(`DELETE FROM ${tableName} WHERE session_id = $1`,[req.body.session_id]);
   
 }

 return {
    findAll,
    findById, 
    updateItem,
    findByValue,
    createclient,
    deleteById,
    deleteBySessionId
 }
}

const dbservice =dbCalls(client);

export default dbservice;