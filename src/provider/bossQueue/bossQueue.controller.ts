//import packages
import { Controller, Post, Body } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Payload, RmqContext, Ctx } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

//import constants
import { CONTROLLER } from './bossQueue.constants';
//import dtos
import { BossQueueMessageDto } from "./bossQueue.dto";
//import services
import { LoggerService } from "src/common/logger/logger.service";
import { BossQueueService } from "./bossQueue.service";

const {
    PATTERN
} = CONTROLLER;

@ApiTags('test')
@Controller('schedulequeue')
export class BossQueueController {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleQueueService: BossQueueService
    ) {
        this.logger.setContext(BossQueueController.name);
    };

    @MessagePattern(PATTERN)
    async customMessage(@Payload() data: BossQueueMessageDto, @Ctx() context: RmqContext) {
        try {
            const channel = context.getChannelRef();
            const originMessage = context.getMessage();
            await this.scheduleQueueService.handleMessage(data);
            await channel.ack(originMessage);
        } catch (err) {
            throw err;
        };
    };

    //測試用send message to schedule_queue
    @Post('create')
    create(@Body() data: BossQueueMessageDto) {
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