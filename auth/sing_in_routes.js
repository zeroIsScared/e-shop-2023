//import {pool} from '../databaseConnection.js';
import {v4 as uuidv4} from 'uuid';
import {client} from '../dataBaseClient.js';
import { notAuthorised} from '../routes/serviceHelpers.js';
import { databaseOperations } from '../databaseCalls.js'; 

export const authRoutes =async(fastify, options)=>{

   const dO = new databaseOperations();
    fastify.post('/signin', async  (req, rep) => {
        //console.log(req.body);
      const res = await  client.query(`SELECT * FROM clients WHERE email= $1 AND password= $2;`,[req.body.email, req.body.password]);
           

         if (res.rows[0] === undefined) 
         {
            notAuthorised(rep);
         }
         try
         {
            const sessionId = uuidv4();
            console.log(sessionId);
            //console.log(res.rows[0].id);
            try{
             await client.query(`INSERT INTO client_sessions (session_id, client_id) VALUES($1, $2);`,[sessionId, res.rows[0].id]);
                

                    rep.code(200).send({satus: 'ok', session_id: `${sessionId}`}); 

                }catch(error) {
                    console.log(error.message);

                }                
            }catch (error){           
                  
            console.log(err.message);
        }      
        });
   

    fastify.post('/signout', async (req,rep) => {
      
        try {
         const res= await dO.deleteBySessionId('client_sessions',req)
         console.log(res);
            if (res.rowCount === 0)        
            {
                rep.code(401).send(`The session id was not found`);
            }
           else 
            {
                rep.code(200).send({status:"success"});               
            } 
        }catch(err)
        {
                console.log(err.message);
         }
        })
    
};