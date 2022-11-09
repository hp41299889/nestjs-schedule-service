import { registerAs } from '@nestjs/config';

export default registerAs('rabbitmq', () => ({
    IP: process.env.RABBITMQ_USERNAME,
    port: process.env.RABBITMQ_PORT,
    account: process.env.RABBITMQ_ACCOUNT,
    password: process.env.RABBITMQ_PASSWORD,
    inputQueueName: process.env.RABBITMQ_INPUTQUEUENAME,
    outputQueueName: process.env.RABBITMQ_OUTPUTQUEUENAME
}));