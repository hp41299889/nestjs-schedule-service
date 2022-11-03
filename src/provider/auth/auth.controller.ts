import { Controller, Post, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post()
    async login() {

    };

    @Get()
    async logout() {

    };
};