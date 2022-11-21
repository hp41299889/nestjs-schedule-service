//import packages
import { Injectable, Scope, ConsoleLogger } from "@nestjs/common";

//import constants
import { SERVICE } from "./logger.constants";

const {
    CONTROLLER_DEBUG,   //debug message for controller
    SERVICE_DEBUG,      //debug message for service
    FACTORY_DEBUG,      //debug message for module connect factory
} = SERVICE;

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
    controllerDebug(data: string): void {
        this.debug(`${CONTROLLER_DEBUG} ${data}`);
    };

    serviceDebug(data: string): void {
        this.debug(`${SERVICE_DEBUG} ${data}`);
    };

    factoryDebug(data: any): void {
        const { connectionName, config } = data;
        this.debug(`${FACTORY_DEBUG} ${connectionName}`, { config });
    };

    errorMessage(data: any): void {
        this.error(`${data}`);
    };
};