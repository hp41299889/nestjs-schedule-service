//import packages
import { Module } from "@nestjs/common";

//import services
import { LoggerService } from "./logger.service";

@Module({
    providers: [LoggerService],
    exports: [LoggerService]
})
export class LoggerModule { };