import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongoModule } from './mongo/mongo.module';
import { PostgresModule } from './postgres/postgres.module';

@Module({
    imports: [
        MongoModule,
        PostgresModule
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule { }