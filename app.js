import Fastify from 'fastify';
import {res} from './databaseConnection.js';

 const fastify= Fastify({logger:true});

const PORT = {port: 3000};


const start =  async () =>{
    try{
        await fastify.listen(PORT);
        fastify.log.info(`server listen on ${PORT.port}`)
    }catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

fastify.get('/', (req, rep) =>{
    const products =  res.rows;
    const greeting = 'Hello World!'
    return  {greeting, products};
})

start();