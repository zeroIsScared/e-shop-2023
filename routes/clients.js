import {pool} from '../databaseConnection.js';
import { addClientsValidationBody, addClientsValidationResponse } from './clientsValidationSchema.js';



export const clientsRoutes = async(fastify,options) => {
    fastify.get('/', (req, rep) =>{
        pool.query('SELECT * FROM clients;', (err, res) => {
            if(!err) {
                rep.send(res.rows);
            }else {
                console.log(err.message);
            }
        });
    });

    fastify.get('/:id', (req, rep) => {
        pool.query(`SELECT * FROM clients WHERE id= ${req.params.id}`,
         (err, res) => {
            if(!err) {
                rep.send(res.rows[0]);
            } else {
                console.log(err.message);
            }
        });
    });

    fastify.post('/', {
        schema : {
            body: addClientsValidationBody        
        }
    }, (req, rep) => {
        const bodyValidationFunction = req.getValidationFunction('body');
    
        const {name, address, phone, email, password} = JSON.parse(req.body);       
        pool.query(`INSERT INTO clients (name, address, phone,email, password) VALUES ('${name}', '${address}', ${Number(phone)}, '${email}', '${password}');`, 
        (err, res)=>{
            if(!err){
                console.log(res);                         
                 rep.code(200).send(`A new client ${name} was added`);               
            }else {
                console.log(err.message);
                return 'Something went wrong!'
            }
            
        }); 
        
    }); 
    
    fastify.patch('/:id', (req, rep)=> {

       const body = JSON.parse(req.body);
      const reqItems=  Object.entries(body);
     let newValues = [];
     reqItems.forEach(item => {

        if(item !== body.phone){
            newValues.push(`${item[0]} ='${item[1]}'`);
            
        } else {
            newValues.push(item[0] =Number(item[1]));
        }
      });       

    pool.query(`UPDATE clients SET ${newValues} WHERE id = ${req.params.id}`, (err, res) => {
        if(!err) {
            rep.send(`The client with id ${req.params.id} was updated! `)
        } else {
            console.log(err.message);
        }
    
    });

});

fastify.delete(`/:id`, (req, rep) => {
    pool.query(`DELETE FROM clients WHERE id = ${req.params.id}`, (err, res)=>{
        if(!err) {
            rep.send(`The client if id ${req.params.id} was deleted`);
        } else {
            console.log(err.message);
        }
    })
})
}

    
