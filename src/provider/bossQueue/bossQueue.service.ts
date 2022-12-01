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

    private inputMessageID = 1;
    private outputMessageID = 1;

    async handleMessage(data: BossQueueMessageDto) {
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
                        id: this.outputMessageID++
                    });
                    break;
                };
                case 'readAll': {
                    const schedules = await this.scheduleService.readAll();
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: schedules,
                        error: {},
                        id: this.outputMessageID++
                    });
                    break;
                };
                case 'queryID': {
                    const schedule = await this.scheduleService.read(params as ReadScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: schedule,
                        error: {},
                        id: this.outputMessageID++
                    })
                    break;
                };
                case 'update': {
                    await this.scheduleService.update(params as UpdateScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: 'Success',
                        error: {},
                        id: this.outputMessageID++
                    });
                    break;
                };
                case 'delete': {
                    await this.scheduleService.delete(params as DeleteScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: 'Success',
                        error: {},
                        id: this.outputMessageID++
                    });
                    break;
                };
            };
        } catch (err) {
            this.sendAPIServerMessage({
                jsonrpc: '2.0',
                results: '',
                err: { ...err },
                id: this.outputMessageID++
            })
            throw err;
        };
    };

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