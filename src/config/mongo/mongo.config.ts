import { registerAs } from '@nestjs/config';

export default registerAs('mongoDB', () => ({
    IP: process.env.MONGO_IP,
    port: process.env.MONGO_PORT,
    account: process.env.MONGO_ACCOUNT,
    password: process.env.MONGO_PASSWORD,
    DBName: process.env.MONGO_DBNAME
}));