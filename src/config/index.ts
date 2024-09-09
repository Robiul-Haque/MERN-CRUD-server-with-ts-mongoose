import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DATABASE_URL,
    jwt_access_key: process.env.JWT_ACCESS_KEY,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    forget_email_jwt_access_expire_in: process.env.FORGET_EMAIL_JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_key: process.env.JWT_REFRESH_KEY,
    jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
    salt_rounds: process.env.SALT_ROUNDS
}