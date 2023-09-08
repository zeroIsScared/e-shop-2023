 import {pool} from '../databaseConnection.js';

 const productRoutes = async(fastify, options)=> {

fastify.get('/:id',  (req, reply) => {   

const productId = req.params.id;
console.log(productId);

    pool.query(
        `SELECT * FROM products WHERE id= ${productId};`, 
        (err, res)=>{
            if(!err) {
                console.log('!!!');
                console.log(res);
                
                reply.send(res.rows);
                         
            }
            else {
                console.log(err.message);
            }    
                   
    });      
  
  
})
}

export {productRoutes};


// // fastify.get('/', (req, rep) =>{
// //     const products =  result.rows;
// //     const greeting = 'Hello World!'
// //     return  {greeting, products};
// })