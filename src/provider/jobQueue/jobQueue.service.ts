//import packages
import { Injectable, Inject } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { timeout, Observable, map, catchError } from 'rxjs';

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

    async sendMessage(data: SendMessageDto) {
        try {
            this.logger.serviceDebug(SENDMESSAGE_METHOD);
            data.id = this.messageID++;
            return await this.client.connect()
                .then(() => {
                    return this.client.emit('', data)
                }).catch(err => {
                    return this.client.emit('', data)
                        .pipe(
                            catchError(connectionError => {
                                throw connectionError;
                            })
                        );
                });
        } catch (err) {
            console.log('catch in job', err);
            throw err;
        };
    };

    watchClient() {
        this.client.connect

        return '';
    };
};