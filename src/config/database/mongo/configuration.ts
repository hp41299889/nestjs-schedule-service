import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    database: process.env.MONGO_DATABASE
}));