import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, map } from 'rxjs';

// import { PerfectCubicSumDto } from 'src/common/math/math.dto';
import { ChildProcessDto } from 'src/provider/childProcess/childProcess.dto';
import { MessageMQCLIDto } from './rabbitmq.dto';

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject('RabbitMQ') private readonly client: ClientProxy,
    ) { };

    private messageID = 1;

    buildMessage(cmd: string, baseMethod?: any, data?: any) {
        const method = `${baseMethod}/${cmd}`;
        const message = {
            jsonrpc: '2.0',
            method: method,
            params: data,
            id: this.messageID++,
            cmd: cmd
        };

        return this.sendMessage(message);
    };

    sendMessage(message: MessageMQCLIDto) {
        const { cmd } = message;
        this.client
            .emit({ cmd }, message)
            .pipe(timeout(10000));
        return 'sent message ok!';
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

    async sendChildProcess(data: ChildProcessDto) {
        return this.client
            .send('childProcess', data)
            .pipe(timeout(10000))
    };
};