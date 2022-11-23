//import packages
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

//import others
import appConfig from './app/app.config';
import mongoConfig from './mongo/mongo.config';
import postgresConfig from './postgres/postgres.config';

@Module({
    imports: [ConfigModule.forRoot({
        load: [appConfig, postgresConfig, mongoConfig]
    })],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class EnvModule { };