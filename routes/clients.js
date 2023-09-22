import  {databaseOperations} from '../databaseCalls.js';
import { addClientsValidationBody, addClientsValidationResponse } from './clientsValidationSchema.js';
import { checkSessionCorespondsToId, showOnlyIdName , notAuthorised} from './serviceHelpers.js';



export const clientsRoutes = async(fastify,options) => {
    const dO = new databaseOperations();
    fastify.get('/',async  (req, rep) =>{
        try {
            const allClients = await dO.findAll('clients');

            const clients = allClients.rows.map(item  => {

                return {id: item.id, name: item.name};          
               
              });
              rep.send(clients);

        }catch (err)
        {
            console.log(err.message);

        }   
        });
    

    fastify.get('/:id', {
    preHandler: async (request, reply) => {

        
        const clientQueryResult = await dO.findById('clients', request.params.id);
       
                     
            if ( !request.query.session_id && clientQueryResult.rows[0] === undefined || clientQueryResult.rows[0] === undefined ) 
            {
                reply.send(`The client with id ${request.params.id} was not found`);

            }   
            else if((!request.query.session_id && clientQueryResult.rows[0] !== undefined))
            {
                reply.send(showOnlyIdName(clientQueryResult));      
                        
            }                       
        }   
        
    ,
    handler: async (req, rep) => {        

        const clientQueryResult = await dO.findById('clients', req.params.id);      
       
                 
            if(checkSessionCorespondsToId(`client_sessions`,req))
            {                
                rep.send(clientQueryResult.rows[0]);           
            } 
            else 
            {
                rep.send(showOnlyIdName(clientQueryResult));
            }         
    }
    });

    fastify.post('/',
    async (req, rep) => {

        const bodyValidationFunction = req.compileValidationSchema(addClientsValidationBody)
        const validationResult =  bodyValidationFunction(req.body);
        
     
         if( validationResult === false) {
             rep.code(400).send(`In order to create a new client the request body should contain the name, address, phone, email and password fields`);
        } 
        else 
        {         

          try{
               await dO.createclient('clients', req.body);                    
                            
            } catch(err){
                console.log(err.message);
                return 'Something went wrong!';
            }

            rep.code(200).send(`A new client ${req.body.name} was added`);   
        }
            
    }); 
   
    
    fastify.patch('/:id', {
        preHandler: async (request, reply) => {              
               
                if ( !request.query.session_id ) 
                {
                   notAuthorised(reply);
                }   
                                     
            },
        handler: async(req, rep)=> {                                        
      

            if(checkSessionCorespondsToId(`client_sessions`,req))
            {
                try{              
                   const res=  await dO.updateItem('clients',req);
                   console.log(res);                   
                }
                catch(err){
                    console.log(err.message);
                }

                rep.send(`The client with id ${req.params.id} was updated! `);           
            } 
            else 
            {
                notAuthorised(rep); 
            }                    
        }   

    });

fastify.delete(`/:id`, {
    prehandler: async (request, reply)=> {

        if ( !request.query.session_id ) 

                {
                    notAuthorised(reply); 
                }                  

    },
    handler: async (req, rep)=> {                       
            

        if( checkSessionCorespondsToId(`client_sessions`,req)) 
        {
            try{
                dO.deleteById('clients',req);
            }
            catch(err)
            {
                console.log(err.message);
            }

            rep.send(`The client if id ${req.params.id} was deleted`);
        }
        else
        {
            notAuthorised(rep); 
        }  
}
});
};

    
