//import packages
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//import constants
import { SERVICE } from './jobQueue.constants';
//import dtos
import { BuildMessageDto, JsonrpcMessageDto, SendMessageDto } from './jobQueue.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CONNECTION_NAME,      //connection name for JobQueue
    BUILDMESSAGE_METHOD,  //buildMessage()
    SENDMESSAGE_METHOD,   //sendMessage()
} = SERVICE;

@Injectable()
export class JobQueueService {
    constructor(
        @Inject(CONNECTION_NAME)
        private readonly client: ClientRMQ,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(JobQueueService.name);
    };

    private messageID = 1;

    async buildMessage(data: BuildMessageDto): Promise<JsonrpcMessageDto> {
        try {
            this.logger.serviceDebug(BUILDMESSAGE_METHOD);;
            return {
                ...data,
                id: this.messageID++
            };
        } catch (err) {
            throw err;
        };
    };

    async sendMessage(data: SendMessageDto): Promise<void> {
        try {
            this.logger.serviceDebug(SENDMESSAGE_METHOD);
            this.client
                .emit(CONNECTION_NAME, await this.buildMessage(data))
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };
};