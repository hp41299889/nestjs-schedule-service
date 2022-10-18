import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Dog } from './dog/dog.entity';

@Injectable()
export class PostgreService implements TypeOrmOptionsFactory {
    constructor(
        private readonly configService: ConfigService
    ) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const username = this.configService.get('POSTGRE_USERNAME');
        const password = this.configService.get('POSTGRE_PASSWORD');
        const host = this.configService.get('POSTGRE_HOST');
        const port = this.configService.get('POSTGRE_PORT');
        const database = this.configService.get('POSTGRE_DATABASE');
        return {
            type: 'postgres',
            username: username,
            password: password,
            host: host,
            port: port,
            database: database,
            entities: [Dog],
            synchronize: true,
        }
    };
};
