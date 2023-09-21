import Fastify from 'fastify';
import {productRoutes} from './routes/products.js';
import {homePageRoute} from './routes/homePage.js';
import {clientsRoutes} from './routes/clients.js';
import {authRoutes} from './auth/sing_in_routes.js';

 const fastify= Fastify({logger:true});
const PORT = {port: 3000};

fastify.register(import('@fastify/postgres'), {
    connectionString: 'postgres://postgres:01133@localhost:5432/e_shop_2023'
})

 fastify.register(productRoutes, {prefix:'/products'});
 fastify.register(authRoutes, {prefix:'/auth'});
 fastify.register(homePageRoute);
 fastify.register(clientsRoutes, {prefix:'/clients'});

 
fastify.decorate('testMiddleware',() => console.log(`TEST!!!`));

fastify.addHook('preHandler', async (request,reply)=> {
    fastify.testMiddleware(request);
});

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