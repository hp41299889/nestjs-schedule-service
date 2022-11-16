//import packages
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

//import modules
import { ConfigModule } from "src/config/config.module";
//import constants
import { MODULE } from './mongo.constants';
//import dtos
import { MongoDBConfigDto } from "src/config/json/json.dto";
//import services
import { JsonService } from "src/config/json/json.service";

const {
    CONNECTION_NAME,    //
    SETUP_TAG,          //
} = MODULE;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: CONNECTION_NAME,
            imports: [ConfigModule],
            inject: [JsonService],
            useFactory: async (jsonService: JsonService) => {
                const mongoConfig: MongoDBConfigDto = jsonService.read(SETUP_TAG);
                const { IP, port, account, password, DBName } = mongoConfig;
                const uri = `mongodb://${account}:${password}@${IP}:${port}/${DBName}`;
                return { uri };
            }
        })
    ]
})
export class MongoModule { }