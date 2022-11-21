//import packages
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//import constants
import { SERVICE } from './job.constants';
//import dtos
import { BuildMessageDto, JsonrpcMessageDto, SendMessageDto } from './job.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CONNECTION_NAME,      //connection name for JobQueue
    BASEMETHOD,           //baseMethod for JsonrpcMessageDto
    BUILDMESSAGE_METHOD,  //buildMessage()
    SENDMESSAGE_METHOD,   //sendMessage()
} = SERVICE;

@Injectable()
export class JobQueueService {
    constructor(
        @Inject(CONNECTION_NAME)
        private readonly client: ClientProxy,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(JobQueueService.name);
    };

    private messageID = 1;

    async buildMessage(data: BuildMessageDto): Promise<JsonrpcMessageDto> {
        try {
            this.logger.serviceDebug(BUILDMESSAGE_METHOD);;
            const { pattern, message } = data;
            return {
                jsonrpc: '2.0',
                method: `${BASEMETHOD}${pattern}`,
                params: message,
                id: this.messageID++
            };
        } catch (err) {
            throw err;
        };
    };

    async sendMessage(data: SendMessageDto): Promise<void> {
        try {
            this.logger.serviceDebug(SENDMESSAGE_METHOD);
            const { pattern } = data;
            this.client
                .emit(pattern, await this.buildMessage(data))
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };
};