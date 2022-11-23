//import packages
import { registerAs } from "@nestjs/config";

//import constants
import { CONFIG } from './postgres.constants';

const {
    CONFIG_ALIAS,   //alias for ConfigModule
} = CONFIG;

export default registerAs(CONFIG_ALIAS, () => ({
    IP: process.env.POSTGRES_IP,
    port: process.env.POSTGRES_PORT,
    account: process.env.POSTGRES_ACCOUNT,
    password: process.env.POSTGRES_PASSWORD,
    DBName: process.env.POSTGRES_DBNAME
}));