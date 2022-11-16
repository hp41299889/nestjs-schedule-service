//import packages
import { registerAs } from "@nestjs/config";

//import constants
import { CONFIG } from './app.constants';

const {
    CONFIG_ALIAS,   //
} = CONFIG;

export default registerAs(CONFIG_ALIAS, () => ({
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    prefix: process.env.APP_PREFIX,
    port: process.env.APP_PORT
}))