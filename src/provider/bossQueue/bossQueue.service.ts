//import packages
import { Injectable, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//import constants
import { SERVICE } from './bossQueue.constants';
//import dtos
import { BossQueueMessageDto } from './bossQueue.dto';
import { CreateScheduleDto, DeleteScheduleDto, ReadScheduleDto, UpdateScheduleDto } from '../../service/schedule/schedule.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';
import { ScheduleService } from '../../service/schedule/schedule.service';

const {
    CONNECTION_NAME
} = SERVICE;
@Injectable()
export class BossQueueService {
    constructor(
        @Inject(CONNECTION_NAME)
        private readonly client: ClientRMQ,
        private readonly logger: LoggerService,
        private readonly scheduleService: ScheduleService
    ) {
        this.logger.setContext(BossQueueService.name);
    };

    private messageID = 1;

    async handleMessage(data: BossQueueMessageDto) {
        //TODO dto
        try {
            this.logger.serviceDebug('handleMessage');
            const { method, params } = data;
            const action = method.split('/')[2];
            switch (action) {
                case 'create': {
                    await this.scheduleService.create(params as CreateScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: 'Success',
                        error: {},
                        id: this.messageID++
                    });
                    break;
                };
                case 'readAll': {
                    const schedules = await this.scheduleService.readAll();
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: schedules,
                        error: {},
                        id: this.messageID++
                    });
                    break;
                };
                case 'queryID': {
                    const schedule = await this.scheduleService.read(params as ReadScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: schedule,
                        error: {},
                        id: this.messageID++
                    })
                    break;
                };
                case 'update': {
                    await this.scheduleService.update(params as UpdateScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: 'Success',
                        error: {},
                        id: this.messageID++
                    });
                    break;
                };
                case 'delete': {
                    await this.scheduleService.delete(params as DeleteScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: 'Success',
                        error: {},
                        id: this.messageID++
                    });
                    break;
                };
            };
        } catch (err) {
            throw err;
        };
    };

    sendAPIServerMessage(data: any) {
        try {
            this.logger.serviceDebug('sendAPIServerMessage');
            this.client
                .emit('otherPattern', data)
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };

    //測試用send message to schedule_queue
    testMessage(data: BossQueueMessageDto) {
        try {
            this.logger.serviceDebug('testMessage');
            this.client
                .emit('boss_queue', data)
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };
};