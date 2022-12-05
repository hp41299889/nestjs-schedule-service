//import packages
import { Controller, Post, Body } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Payload, RmqContext, Ctx } from "@nestjs/microservices";

//import dtos
import { BossQueueMessageDto } from "./bossQueue.dto";
//import services
import { LoggerService } from "src/common/logger/logger.service";
import { BossQueueService } from "./bossQueue.service";


@Controller('schedulequeue')
export class BossQueueController {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleQueueService: BossQueueService,
    ) {
        this.logger.setContext(BossQueueController.name);
    };

    @MessagePattern()
    async customMessage(@Payload() data: BossQueueMessageDto, @Ctx() context: RmqContext) {
        try {
            const { jsonrpc, method, results, id } = data;
            const channel = context.getChannelRef();
            const originMessage = context.getMessage();
            channel.ack(originMessage);
            if (!(jsonrpc == '2.0') || !id) {
                throw '-32700 Parse error';
            } else {
                if (method) {
                    await this.scheduleQueueService.handleMessage(data);
                } else if (results) {
                    this.scheduleQueueService.sendAPIServerMessage(data);
                } else {
                    throw '-32700 Parse error';
                };
            };
        } catch (err) {
            throw err;
        };
    };
};