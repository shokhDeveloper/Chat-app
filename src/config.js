import { config } from "dotenv"
import path from "node:path";
config({path: path.join(process.cwd(), "src", ".env")})
export const serverConfiguration = {
    PORT: process.env.PORT || 7000,
    SECRET_KEY: process.env.SECRET_KEY,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN
}
export const postgresIntegration = {
    port: 5432,
    database: process.env.DATABASE_NAME,
    user: process.env.USER_POSTGRES,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST
}