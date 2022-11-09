import { registerAs } from '@nestjs/config';

export default registerAs('admin', () => ({
    account: process.env.ADMIN_ACCOUNT,
    password: process.env.ADMIN_PASSWORD
}));