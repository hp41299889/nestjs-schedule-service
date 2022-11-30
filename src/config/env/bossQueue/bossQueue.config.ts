//import packages
import { registerAs } from "@nestjs/config";

//import constants
import { CONFIG } from './bossQueue.constants';

const {
    CONFIG_ALIAS,   //alias for ConfigModule
} = CONFIG;

export default registerAs(CONFIG_ALIAS, () => ({
    IP: process.env.BOSSQUEUE_IP,
    port: process.env.BOSSQUEUE_PORT,
    account: process.env.BOSSQUEUE_ACCOUNT,
    password: process.env.BOSSQUEUE_PASSWORD,
    inputQueueName: process.env.BOSSQUEUE_INPUT_QUEUENAME,
    outputQueueName: process.env.BOSSQUEUE_OUTPUT_QUEUENAME
}))