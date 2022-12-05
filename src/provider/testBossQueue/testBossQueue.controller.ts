//import packages
import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

//import dtos
import { BossQueueMessageDto } from "./testBossQueue.dto";
//import services
import { LoggerService } from "src/common/logger/logger.service";
import { TestBossQueueService } from "./testBossQueue.service";


@ApiTags('test')
@Controller('schedulequeue')
export class TestBossQueueController {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleQueueService: TestBossQueueService,
    ) {
        this.logger.setContext(TestBossQueueService.name);
    };

    //測試用send message to schedule_queue
    @Post('create')
    create(@Body() data: BossQueueMessageDto) {
        this.scheduleQueueService.testMessage(data);
    };
};