//import {dbConnections} from '../databaseConnection.js';
import { addClientsValidationBody, addClientsValidationResponse } from './clientsValidationSchema.js';



export const clientsRoutes = async(fastify,options) => {
    fastify.get('/', (req, rep) =>{
        fastify.pg.query('SELECT * FROM clients;', (err, res) => {
            if(!err) {               
                const clients = res.rows.map(item  => {
                  return {id: item.id, name: item.name};                 
                });                            
                rep.send(clients);
            } 
            else 
            {
                console.log(err.message);
            }
        });
    });

  
        fastify.get('/:id', {
    preHandler: async (request, reply) => {
        
        const client = await fastify.pg.connect();
        const clientQueryResult = await client.query(`SELECT * FROM clients WHERE id= ${request.params.id}`);       
                     
            if ( !request.query.session_id && clientQueryResult.rows[0] === undefined || clientQueryResult.rows[0] === undefined ) 
            {
                reply.send(`The client with id ${request.params.id} was not found`);
            }   
            else if((!request.query.session_id && clientQueryResult.rows[0] !== undefined))
            {
                reply.send({id: clientQueryResult.rows[0].id,
                name: clientQueryResult.rows[0].name});                          
            }                       
        }         
    ,
    handler: async (req, rep) => {
      
        const client = await fastify.pg.connect();
        const clientQueryResult = await client.query(`SELECT * FROM clients WHERE id= ${req.params.id}`);          
        const sessionIdQuery = await client.query(`SELECT * FROM client_sessions WHERE session_id = '${req.query.session_id}' `);
                 
            if(sessionIdQuery.rows[0] !== undefined && sessionIdQuery.rows[0].client_id == req.params.id)
            {                
                rep.send(clientQueryResult.rows[0]);           
            } 
            else if (clientQueryResult.rows[0] !== undefined && sessionIdQuery.rows[0] !== req.params.id)
            {
                rep.send({id: clientQueryResult.rows[0].id,
                    name: clientQueryResult.rows[0].name});
            }         
    }
    });
    
    fastify.post('/',
    (req, rep) => {
        const bodyValidationFunction = req.compileValidationSchema(addClientsValidationBody)
        const validationResult =  bodyValidationFunction(req.body);
        
     console.log(validationResult);
         if( validationResult === false) {
             rep.code(400).send(`In order to create anew client the request body should contain the name, address, phone, email and password fields`);
        } else {
    
        const {name, address, phone, email, password} = req.body;   
        console.log(name, address, phone, email,password )    
        fastify.pg.query(`INSERT INTO clients (name, address, phone,email, password) VALUES ('${name}', '${address}', ${phone}, '${email}', '${password}');`, 
        (err, res)=>{
            if(!err){
            //console.log(res);                         
                 rep.code(200).send(`A new client ${name} was added`);               
            }else {
                console.log(err.message);
                return 'Something went wrong!'
            }
            
        }); 
    };
        
    }); 
    
    fastify.patch('/:id', {
        prehandler: async (request,reply) => {

        },
        handler: async(req, rep)=> {

            const body = req.body;
           const reqItems=  Object.entries(body);
          let newValues = [];
          reqItems.forEach(item => {
     
             if(item !== body.phone){
                 newValues.push(`${item[0]} ='${item[1]}'`);
                 
             } else {
                 newValues.push(item[0] =Number(item[1]));
             }
           });       
     
           fastify.pg.query(`UPDATE clients SET ${newValues} WHERE id = ${req.params.id}`, (err, res) => {
             if(!err) {
                 rep.send(`The client with id ${req.params.id} was updated! `)
             } else {
                 console.log(err.message);
             }
         
         });

    }    
   

});

fastify.delete(`/:id`, (req, rep) => {
    fastify.pg.query(`DELETE FROM clients WHERE id = ${req.params.id}`, (err, res)=>{
        if(!err) {
            rep.send(`The client if id ${req.params.id} was deleted`);
        } else {
            console.log(err.message);
        }
    })
})
}

    
