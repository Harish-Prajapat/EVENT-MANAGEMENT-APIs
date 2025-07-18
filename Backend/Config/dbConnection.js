import {Pool} from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
// pool.query(console.log('how are you')).then(()=> console.log('connected'))
 pool.query('SELECT NOW()').then(()=>console.log('connected')).catch((err)=>{console.log( ` dfdd ${err}`)})

export default pool