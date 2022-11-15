import { Module } from '@nestjs/common';

import { MongoModule } from './mongo/mongo.module';
import { PostgresModule } from './postgres/postgres.module';
import { DatabaseService } from './database.service';

@Module({
    imports: [
        MongoModule,
        PostgresModule
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule { }