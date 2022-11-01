import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PostgreConfig } from 'src/config/config.interface';
import { AppConfigModule } from 'src/config/app.config.module';
import { DogModule } from '../../model/dog/dog.module';
import { Dog } from 'src/model/dog/dog.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
                const postgreConfig: PostgreConfig = configService.get('postgre');
                const { postgreUsername, postgrePassword, postgreHost, postgrePort, postgreDatabase } = postgreConfig;
                return {
                    type: 'postgres',
                    host: postgreHost,
                    port: postgrePort,
                    username: postgreUsername,
                    password: postgrePassword,
                    database: postgreDatabase,
                    entities: [Dog],
                    synchronize: true
                }
            },
            inject: [ConfigService]
        }),
        DogModule
    ],
})
export class PostgreModule { }