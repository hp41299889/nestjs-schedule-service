import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class MongooseService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            connectionName: 'mongoConnection',
            uri: 'mongodb://admin:a3345678@192.168.36.51:27017/test',
        };
    }
}