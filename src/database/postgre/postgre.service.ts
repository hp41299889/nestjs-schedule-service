import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Dog } from './dog/dog.entity';
import { PostgreConfigService } from 'src/config/database/postgre/postgre.config.service';

@Injectable()
export class PostgreService implements TypeOrmOptionsFactory {
    constructor(
        private readonly configService: ConfigService
    ) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const postgreConfig: PostgreConfigService = this.configService.get('postgre');
        const { username, password, host, port, database } = postgreConfig;

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
