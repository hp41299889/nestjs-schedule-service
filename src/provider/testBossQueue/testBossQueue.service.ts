//import packages
import { Injectable, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//import constants
import { SERVICE } from './testBossQueue.constants';
//import dtos
import { BossQueueMessageDto } from './testBossQueue.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';
import { ScheduleService } from '../../service/schedule/schedule.service';

const {
    CONNECTION_NAME
} = SERVICE;
@Injectable()
export class TestBossQueueService {
    constructor(
        @Inject(CONNECTION_NAME)
        private readonly client: ClientRMQ,
        private readonly logger: LoggerService,
        private readonly scheduleService: ScheduleService
    ) {
        this.logger.setContext(TestBossQueueService.name);
    };

    private inputMessageID = 1;

    sendAPIServerMessage(data: any) {
        try {
            this.logger.serviceDebug('sendAPIServerMessage');
            this.client
                .emit('', data)
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };

    //測試用send message to boss_queue API
    testMessage(data: BossQueueMessageDto) {
        try {
            this.logger.serviceDebug('testMessage');
            data.id = this.inputMessageID++;
            this.client
                .emit('', data)
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };

    //測試用send message to boss_queue
    testAPIServerHandleResponse(data: any) {

    };
};