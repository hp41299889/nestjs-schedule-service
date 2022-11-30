//import packages
import { registerAs } from "@nestjs/config";

//import constants
import { CONFIG } from './jobQueue.constants';

const {
    CONFIG_ALIAS,   //alias for ConfigModule
} = CONFIG;

export default registerAs(CONFIG_ALIAS, () => ({
    IP: process.env.JOBQUEUE_IP,
    port: process.env.JOBQUEUE_PORT,
    account: process.env.JOBQUEUE_ACCOUNT,
    password: process.env.JOBQUEUE_PASSWORD,
    inputQueueName: process.env.JOBQUEUE_INPUT_QUEUENAME,
    outputQueueName: process.env.JOBQUEUE_OUTPUT_QUEUENAME
}))