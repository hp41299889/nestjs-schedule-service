import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoConfigService {
    constructor(
        private configService: ConfigService
    ) { }

    get username(): string {
        return this.configService.get<string>('username');
    };
    get password(): string {
        return this.configService.get<string>('password');
    };
    get host(): string {
        return this.configService.get<string>('host');
    };
    get database(): string {
        return this.configService.get<string>('database');
    };
};