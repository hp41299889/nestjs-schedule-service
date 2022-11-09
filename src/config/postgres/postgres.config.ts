import { registerAs } from '@nestjs/config';

export default registerAs('postgreSQL', () => ({
    IP: process.env.POSTGRE_IP,
    port: process.env.POSTGRE_PORT,
    account: process.env.POSTGRE_ACCOUNT,
    password: process.env.POSTGRE_PASSWORD,
    DBName: process.env.POSTGRE_DBNAME
}));