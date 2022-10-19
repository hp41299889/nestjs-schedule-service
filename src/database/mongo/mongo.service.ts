import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { MongoConfigService } from 'src/config/database/mongo/mongo.config.service';

@Injectable()
export class MongoService implements MongooseOptionsFactory {
    constructor(
        private readonly configService: ConfigService
    ) { }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const mongoConfig: MongoConfigService = this.configService.get('mongo');
        const { username, password, host, database } = mongoConfig;
        const uri = `mongodb://${username}:${password}@${host}/${database}`;

        return {
            uri: uri
        };
    };
};
