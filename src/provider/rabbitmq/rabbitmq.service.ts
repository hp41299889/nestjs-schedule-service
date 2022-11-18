//import packages
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//import constants
import { SERVICE } from './rabbitmq.constants';
//import dtos
import { BuildMessageDto, SendMessageDto } from './rabbitmq.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CONNECTION_NAME,      //
    BASEMETHOD,           //    
    BUILDMESSAGE_METHOD,  //
    SENDMESSAGE_METHOD,   //
} = SERVICE;

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject(CONNECTION_NAME)
        private readonly client: ClientProxy,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(RabbitmqService.name);
    };

    private messageID = 1;

    buildMessage(data: BuildMessageDto) {
        try {
            this.logger.serviceDebug(BUILDMESSAGE_METHOD);;
            const { method, message } = data;
            return {
                jsonrpc: '2.0',
                method: `${BASEMETHOD}${method}`,
                params: data,
                id: this.messageID++
            };
        } catch (err) {
            throw err;
        };
    };

    sendMessage(data: SendMessageDto) {
        try {
            this.logger.serviceDebug(SENDMESSAGE_METHOD);
            const { pattern, message } = data;
            this.client
                .emit(pattern, this.buildMessage({ method: pattern, message: message }))
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };
};