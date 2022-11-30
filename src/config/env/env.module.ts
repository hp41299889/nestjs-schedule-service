//import packages
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

//import others
import appConfig from './app/app.config';
import mongoConfig from './mongo/mongo.config';
import postgresConfig from './postgres/postgres.config';
import bossQueueConfig from './bossQueue/bossQueue.config';
import jobQueueConfig from './jobQueue/jobQueue.config';

@Module({
    imports: [ConfigModule.forRoot({
        load: [
            appConfig,
            postgresConfig,
            mongoConfig,
            bossQueueConfig,
            jobQueueConfig
        ]
    })],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class EnvModule { };