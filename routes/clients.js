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
        const {name, address, phone, email, password} = JSON.parse(req.body);       
        pool.query(`INSERT INTO clients (name, address, phone,email, password) VALUES ('${name}', '${address}', ${Number(phone)}, '${email}', '${password}');`, 
        (err, res)=>{
            if(!err){
                
                console.log(res);
                 rep.send(res);
               
            }else {
                console.log(err.message);
                return 'Something went wrong!'
            }
        });   
        
    });
};