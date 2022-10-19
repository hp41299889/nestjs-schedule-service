import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoService } from './mongo.service';
import { MongoConfigModule } from 'src/config/database/mongo/mongo.config.module';

@Module({
    imports: [
        MongoConfigModule
    ],
    providers: [
        MongoService
    ]
})
export class MongoModule { };
