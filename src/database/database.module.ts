import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { PostgreModule } from './postgre/postgre.module';

@Module({
    imports: [
        MongoModule,
        PostgreModule
    ]
})
export class DatabaseModule { }