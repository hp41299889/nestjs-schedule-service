//import packages
import { registerAs } from "@nestjs/config";

//import constants
import { CONFIG } from './mongo.constants';

const {
    CONFIG_ALIAS,   //alias for ConfigModule
} = CONFIG;

export default registerAs(CONFIG_ALIAS, () => ({
    IP: process.env.MONGO_IP,
    port: process.env.MONGO_PORT,
    account: process.env.MONGO_ACCOUNT,
    password: process.env.MONGO_PASSWORD,
    DBName: process.env.MONGO_DBNAME
}));