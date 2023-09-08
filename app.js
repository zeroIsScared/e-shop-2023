import Fastify from 'fastify';
import {productRoutes} from './routes/products.js';

import {homePageRoute} from './routes/homePage.js';

 const fastify= Fastify({logger:true});

const PORT = {port: 3000};

 fastify.register(productRoutes, {prefix:'/products'});
 fastify.register(homePageRoute);

const start =  async () =>{
    try{
        await fastify.listen(PORT);
        fastify.log.info(`server listen on ${PORT.port}`)
    }catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}


start();