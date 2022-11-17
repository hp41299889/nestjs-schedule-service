//import packages
import { Injectable, Scope, ConsoleLogger } from "@nestjs/common";

//import constants
import { SERVICE_LOGGER } from "./logger.constants";

const {
    DEBUG_MESSAGE   //
} = SERVICE_LOGGER;

@Injectable({ scope: Scope.TRANSIENT })
export class ServiceLogger extends ConsoleLogger {
    debugMessage(method: string) {
        this.debug(`${DEBUG_MESSAGE} ${method}`);
    };
};