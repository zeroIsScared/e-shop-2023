//import } from '../databaseConnection.js';

export const homePageRoute = async(fastify, options)=> {
fastify.get('/',  (req, rep) =>{
  

    fastify.pg.query(
       `Select * FROM products`,
       (err, res)=>{
           if(!err) {
               console.log('query success!');
               console.log(res.rows);                
                rep.send(res.rows);                         
           }
           else {
               console.log(err.message);
           }                
       });       
  });
};