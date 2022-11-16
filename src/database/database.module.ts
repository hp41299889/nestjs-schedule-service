//import packages
import { Module } from '@nestjs/common';

//import modules
import { MongoModule } from './mongo/mongo.module';
import { PostgresModule } from './postgres/postgres.module';
//import services
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