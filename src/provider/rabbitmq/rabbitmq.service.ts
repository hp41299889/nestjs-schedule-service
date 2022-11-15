import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

import { SCHEDULE_QUEUE } from './rabbitmq.constants';

const {
    PROVIDE,
} = SCHEDULE_QUEUE;

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject(PROVIDE) private readonly client: ClientProxy,
    ) { };

    private readonly logger = new Logger(RabbitmqService.name);
    private readonly baseMethod = 'ScheduleService/ScheduleSetup/';
    private messageID = 1;

    buildMessage(method: string, data?: any) {
        return {
            jsonrpc: '2.0',
            method: `${this.baseMethod}${method}`,
            params: data,
            id: this.messageID++
        };
    };

    sendMessage(pattern: string, data?: any) {
        try {
            this.logger.debug('Sending message');
            this.client
                .emit({ pattern }, this.buildMessage(pattern, data))
                .pipe(timeout(10000));
            return 'sent message ok!';
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    // create(data: CreateScheduleDto) {
    //     const message = {
    //         'jsonrpc': '2.0',
    //         'method': 'ScheduleService/ScheduleSetup/create',
    //         'params': data,
    //         'id': 1
    //     };
    //     this.client
    //         .send('somemessage', message)
    //         .pipe(timeout(10000));
    //     return;
    // };

    // readAll(message: MessageMQCLIDto) {
    //     const { cmd, data } = message;
    //     return this.client
    //         .send({ cmd }, data)
    //         .pipe(timeout(10000));
    // };
};