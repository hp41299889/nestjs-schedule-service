//import packages
import { Controller, Post, Body } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Payload, RmqContext, Ctx } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

//import constants
import { CONTROLLER } from './scheduleQueue.constants';
//import dtos
import { ScheduleQueueMessageDto } from "./scheduleQueue.dto";
//import services
import { LoggerService } from "src/common/logger/logger.service";
import { ScheduleQueueService } from "./scheduleQueue.service";

const {
    PATTERN
} = CONTROLLER;

//TODO use constants and debug message
@ApiTags('test')
@Controller('schedulequeue')
export class ScheduleQueueController {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleQueueService: ScheduleQueueService
    ) {
        this.logger.setContext(ScheduleQueueController.name);
    };

    @MessagePattern(PATTERN)
    async customMessage(@Payload() data: ScheduleQueueMessageDto, @Ctx() context: RmqContext) {
        try {
            const channel = context.getChannelRef();
            const originMessage = context.getMessage();
            channel.ack(originMessage);
            await this.scheduleQueueService.handleMessage(data);
            channel.ack(originMessage);
        } catch (err) {
            throw err;
        };
    };

    //測試用send message to schedule_queue
    @Post('create')
    create(@Body() data: ScheduleQueueMessageDto) {
        this.scheduleQueueService.testMessage(data);
    };

    @MessagePattern('otherPattern')
    async apiserverCustom(@Payload() data: any, @Ctx() context: RmqContext) {
        console.log(data);
        const channel = context.getChannelRef();
        const originMessage = context.getMessage();
        channel.ack(originMessage);

    };
};