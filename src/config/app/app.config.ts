import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    enableScheduleService: process.env.APP_ENABLESCHEDULESERVICE,
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    prefix: process.env.APP_PREFIX,
    port: process.env.APP_PORT,
}));