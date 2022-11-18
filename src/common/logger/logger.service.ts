//import packages
import { Injectable, Scope, ConsoleLogger } from "@nestjs/common";

//import constants
import { SERVICE } from "./logger.constants";

const {
    CONTROLLER_DEBUG,
    SERVICE_DEBUG,
    FACTORY_DEBUG
} = SERVICE;

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
    controllerDebug(data: string) {
        this.debug(`${CONTROLLER_DEBUG} ${data}`);
    };

    serviceDebug(data: string) {
        this.debug(`${SERVICE_DEBUG} ${data}`);
    };

    factoryDebug(data: any) {
        const { connectionName, config } = data;
        this.debug(`${FACTORY_DEBUG} ${connectionName}`, { config });
    };

    errorMessage(data: any) {
        this.error(`${data}`);
    };
};