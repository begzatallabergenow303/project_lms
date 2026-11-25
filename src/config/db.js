import { Pool } from "pg";

const pool = new Pool({
    port: process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
})

export default pool