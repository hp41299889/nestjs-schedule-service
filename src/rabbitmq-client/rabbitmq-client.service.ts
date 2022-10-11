import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitmqClientMessageDto } from './rabbitmq-client.dto';

@Injectable()
export class RabbitmqClientService {
    constructor(
        @Inject('danny_service') private readonly client: ClientProxy
    ) { }

    async postMessageToRabbitmq(data: RabbitmqClientMessageDto) {
        const { name, message } = data;
        const rabbitmqResponse = `Hi ${name}, I'm RabbitMQ, you said ${message}`;
        console.log(rabbitmqResponse);

        this.client.send('post-message', rabbitmqResponse);
    };
};