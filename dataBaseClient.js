import  pg from 'pg';

const {Client} = pg;

 export const client = new Client({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'e_shop_2023',
            password: '01133',
            port: 5432,
 });  

 await client.connect();