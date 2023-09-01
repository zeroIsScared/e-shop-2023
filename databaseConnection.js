import  pg from 'pg';


const {Client} = pg;

export let res;

const connectDb = async () => {
    try {
        const client = new Client({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'e_shop_2023',
            password: '01133',
            port: 5432,
        })
 
        await client.connect();
         res = await client.query('SELECT * FROM products');
        console.log(res);
        await client.end();
    } catch (error) {
        console.log(error);
    }
}
 
connectDb();

