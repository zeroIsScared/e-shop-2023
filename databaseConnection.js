import  pg from 'pg';

const {Pool} = pg;

 export const pool = new Pool({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'e_shop_2023',
            password: '01133',
            port: 5432,
 });        

 
//  await client.connect();

// client.query(`Select * FROM products`,(err, res)=>{
//     if(!err) {
//         console.log(res.rows);
//     }
//     else {
//         console.log(err.message);
//     }
//     client.end;
// } )