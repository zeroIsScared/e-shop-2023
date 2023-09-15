import {pool} from '../databaseConnection.js';
import {v4 as uuidv4} from 'uuid';

export const authRoutes =async(fastify, options)=>{

   
    fastify.post('/signin', (req, rep) => {
        console.log(req.body.email);
        pool.query(`SELECT * FROM clients WHERE email= '${req.body.email}' AND password= '${req.body.password}';`, (err, res) => {
          console.log(res);
          
         if (res.rows[0] === undefined) 
         {
            rep.code(401).send('Authorization failed!');

         }
         else if(!err )
         {
            const sessionId = uuidv4();
            console.log(sessionId);
            console.log(res.rows[0].id);
            pool.query(`INSERT INTO client_sessions (session_id, client_id) VALUES('${sessionId}', ${res.rows[0].id});`,(error, response) => {
                if (!error){

                    rep.code(200).send({satus: 'ok', session_id: `${sessionId}`}); 

                }else {
                    console.log(error.message);

                }                
            })            
        } else {            
            console.log(err.message);
        }      
        });
    });

    fastify.post('/signout', (req,rep) => {
        console.log(req.body);
        pool.query(`DELETE FROM client_sessions WHERE session_id = '${req.body.session_id}'`, (err, res) => {
            if (res.rowCount === 0)
            {
                rep.code(401).send(`The session id was not found`)
            }
           else  if(!err)
            {
                rep.code(200).send({status:"success"});
                console.log(res.rowCount);
            } else 
            {
                console.log(err.message);
            }
        })
    })
};