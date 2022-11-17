//import packages
import { Module } from "@nestjs/common";

//import services
import { ServiceLogger } from "./serviceLogger.service";
import { ControllerLogger } from "./controllerLogger.service";

@Module({
    providers: [ServiceLogger, ControllerLogger],
    exports: [ServiceLogger, ControllerLogger]
})
export class LoggerModule { };