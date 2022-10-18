import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoService implements MongooseOptionsFactory {
    constructor(
        private readonly configService: ConfigService
    ) { }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const username = this.configService.get("MONGO_USERNAME");
        const password = this.configService.get("MONGO_PASSWORD");
        const host = this.configService.get("MONGO_HOST");
        const database = this.configService.get("MONGO_DATABASE");
        const uri = `mongodb://${username}:${password}@${host}/${database}`

        return {
            uri: uri
        };
    };
};
