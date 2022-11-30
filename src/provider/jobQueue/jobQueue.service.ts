//import packages
import { Injectable, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//import constants
import { SERVICE } from './jobQueue.constants';
//import dtos
import { BuildMessageDto, JsonrpcMessageDto, SendMessageDto } from './jobQueue.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';
import { ScheduleClient } from 'src/util/scheduleClient/scheduleClient';

const {
    CONNECTION_NAME,      //connection name for JobQueue
    PATTERN,
    BUILDMESSAGE_METHOD,  //buildMessage()
    SENDMESSAGE_METHOD,   //sendMessage()
} = SERVICE;

@Injectable()
export class JobQueueService {
    constructor(
        @Inject(CONNECTION_NAME)
        private readonly client: ClientRMQ,
        @Inject(CONNECTION_NAME)
        private readonly client2: ScheduleClient,
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
                .emit(PATTERN, await this.buildMessage(data))
                .pipe(timeout(10000));
        } catch (err) {
            throw err;
        };
    };
};