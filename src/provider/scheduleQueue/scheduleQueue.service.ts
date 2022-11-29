//import packages
import { Injectable, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//import constants
import { SERVICE } from './scheduleQueue.constants';
//import dtos
import { ScheduleQueueMessageDto } from './scheduleQueue.dto';
import { CreateScheduleDto, DeleteScheduleDto, ReadScheduleDto, UpdateScheduleDto } from '../../service/schedule/schedule.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';
import { ScheduleService } from '../../service/schedule/schedule.service';

const {
    CONNECTION_NAME
} = SERVICE;
@Injectable()
export class ScheduleQueueService {
    constructor(
        @Inject(CONNECTION_NAME)
        private readonly client: ClientRMQ,
        private readonly logger: LoggerService,
        private readonly scheduleService: ScheduleService
    ) {
        this.logger.setContext(ScheduleQueueService.name);
    };

    private messageID = 1;

    async handleMessage(data: ScheduleQueueMessageDto) {
        //TODO dto
        try {
            this.logger.serviceDebug('handleMessage');
            const { method, params } = data;
            const action = method.split('/')[2];
            switch (action) {
                case 'create': {
                    const schedule = params;
                    await this.scheduleService.create(schedule as CreateScheduleDto);
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
                    const scheduleID = params;
                    const schedule = await this.scheduleService.read(scheduleID as ReadScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: schedule,
                        error: {},
                        id: this.messageID++
                    })
                    break;
                };
                case 'update': {
                    const schedule = params;
                    await this.scheduleService.update(schedule as UpdateScheduleDto);
                    this.sendAPIServerMessage({
                        jsonrpc: '2.0',
                        results: 'Success',
                        error: {},
                        id: this.messageID++
                    });
                    break;
                };
                case 'delete': {
                    const schedule = params;
                    await this.scheduleService.delete(schedule as DeleteScheduleDto);
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
    testMessage(data: ScheduleQueueMessageDto) {
        try {
            this.logger.serviceDebug('testMessage');
            this.client
                .emit(CONNECTION_NAME, data)
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };


};