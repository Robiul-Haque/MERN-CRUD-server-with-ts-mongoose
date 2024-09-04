import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    PORT: process.env.PORT,
    DB_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET_KEY,
    JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
    SALT_ROUNDS: process.env.SALT_ROUNDS
}