import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

import { MongoConfig } from "src/config/config.interface";
import { ConfigModule } from "src/config/config.module";
import { CatModule } from "../../model/cat/cat.module";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const mongoConfig: MongoConfig = configService.get('mongo');
                const { mongoUsername, mongoPassword, mongoHost, mongoDatabase } = mongoConfig;
                const uri = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}/${mongoDatabase}`;

                return { uri };
            },
            inject: [ConfigService]
        }),
        CatModule
    ]
})
export class MongoModule { }