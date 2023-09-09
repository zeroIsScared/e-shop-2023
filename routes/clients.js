import {pool} from '../databaseConnection.js';



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

    fastify.post('/',  (req, rep) => {
        const newClient = req.body;
        console.log(newClient);
       
        console.log( (typeof Number(newClient.phone )));
        pool.query(`INSERT INTO clients ( name, address, phone,email, password) VALUES ( ${newClient.name}, ${newClient.address}, 
            ${Number(newClient.phone)}, ${newClient.email}, ${newClient.password});`, 
        (err, res)=>{
            if(!err){
                rep.send();
                console.log(res);
                return ` A new client ${newClient.name} was created!`
            }else {
                console.log(err.message);
                
            }
        });   
        return 'Something went wrong!'
    });
};