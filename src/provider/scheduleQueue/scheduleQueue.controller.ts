//import packages
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

//import constants
import { CONTROLLER } from './scheduleQueue.constants';
//import dtos
//import services
import { LoggerService } from "src/common/logger/logger.service";

const {
    PATTERN
} = CONTROLLER;

//TODO use constants and debug message
@Controller()
export class ScheduleQueueController {
    constructor(
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(ScheduleQueueController.name);
    };

    @MessagePattern(PATTERN)
    async customMessage(data: any) {
        try {

        } catch (err) {
            throw err;
        };
    };
};