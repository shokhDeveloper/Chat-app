import { postgresIntegration } from "#config";
import pg from "pg";
const {Pool} = pg;
const pool = new Pool(postgresIntegration);
export const fetch = async (query, type, ...params) => {
    const client = await pool.connect();
    try{
        if(type){
            const {rows:[row]} = await client.query(query, params);
            return row
        }
        const {rows} = await client.query(query, params);
        return rows;
    }catch(error){
        console.log(error)
    }finally{
        client.release()
    }
}
export const insertUser = (username, email, password, confirmPassword) => fetch(`INSERT INTO users (username, email, password, confirmPassword) VALUES($1, $2, crypt($3, gen_salt('bf')), crypt($4, gen_salt('bf'))) RETURNING *;`, true, username, email, password, confirmPassword);