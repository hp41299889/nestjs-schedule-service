import { Controller, Post, Body } from '@nestjs/common';
import { RabbitmqClientService } from './rabbitmq-client.service';
import { RabbitmqClientMessageDto } from './rabbitmq-client.dto';

@Controller('rabbitmq-client')
export class RabbitmqClientController {
    constructor(
        private readonly rabbitmqClientService: RabbitmqClientService
    ) { };

    @Post('/message')
    async postMessage(@Body() data: RabbitmqClientMessageDto) {
        return this.rabbitmqClientService.postMessageToRabbitmq(data);
    };
};