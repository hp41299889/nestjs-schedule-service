//import packages
import { Injectable, Scope, ConsoleLogger } from "@nestjs/common";

//import constants
import { CONTROLLER_LOGGER } from "./logger.constants";

const {
    DEBUG_MESSAGE   //
} = CONTROLLER_LOGGER;

@Injectable({ scope: Scope.TRANSIENT })
export class ControllerLogger extends ConsoleLogger {
    debugMessage(method: string) {
        this.debug(`${DEBUG_MESSAGE} ${method}`);
    };
};