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
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const mongoConfig: MongoConfig = configService.get('mongoDB');
                const { IP, port, account, password, DBName } = mongoConfig;
                const uri = `mongodb://${account}:${password}@${IP}:${port}/${DBName}`;

                return { uri };
            }
        })
    ]
})
export class MongoModule { }