import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ConfigModule } from "src/config/config.module";
import { JsonService } from "src/config/json/json.service";
import { MongoDBConfigDto } from "src/config/json/json.dto";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [JsonService],
            useFactory: async (jsonService: JsonService) => {
                const mongoConfig: MongoDBConfigDto = jsonService.read('mongoDB');
                const { IP, port, account, password, DBName } = mongoConfig;
                const uri = `mongodb://${account}:${password}@${IP}:${port}/${DBName}`;
                return { uri };
            }
        })
    ]
})
export class MongoModule { }