import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    prefix: process.env.APP_PREFIX,
    port: process.env.APP_PORT
}))