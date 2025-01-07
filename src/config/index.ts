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
    salt_rounds: process.env.SALT_ROUNDS,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    email_service: process.env.SERVICE,
    email_host: process.env.HOST,
    email_user: process.env.USER,
    email_password: process.env.PASSWORD,
    email: process.env.EMAIL,
}