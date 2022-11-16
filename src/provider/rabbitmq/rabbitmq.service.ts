//import packages
import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

//import constants
import { SERVICE } from './rabbitmq.constants';

const {
    PROVIDE_NAME,           //
    DEBUG_MESSAGE,          //
    DEBUG_MESSAGE_SUCCESS,  //
    BASEMETHOD,             //    
    BUILDMESSAGE_FUNCTION,  //
    SENDMESSAGE_FUNCTION,   //
} = SERVICE;

@Injectable()
export class RabbitmqService {
    constructor(
        @Inject(PROVIDE_NAME) private readonly client: ClientProxy,
    ) { };

    private readonly logger = new Logger(RabbitmqService.name);
    private messageID = 1;

    buildMessage(method: string, data?: any) {
        this.logger.debug(`${DEBUG_MESSAGE} ${BUILDMESSAGE_FUNCTION}`);
        try {
            return {
                jsonrpc: '2.0',
                method: `${BASEMETHOD}${method}`,
                params: data,
                id: this.messageID++
            };
        } catch (err) {
            this.logger.error(err)
            return err;
        };
    };

    sendMessage(pattern: string, data?: any) {
        this.logger.debug(`${DEBUG_MESSAGE} ${SENDMESSAGE_FUNCTION}`);
        try {
            this.client
                .emit({ pattern }, this.buildMessage(pattern, data))
                .pipe(timeout(10000));
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${SENDMESSAGE_FUNCTION}`);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };
};