import { Injectable } from '@nestjs/common';

import { RabbitmqService } from 'src/provider/rabbitmq/rabbitmq.service';
import { ChildProcessDto } from './childProcess.dto';

@Injectable()
export class ChildProcessService {
    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { };

    async childProcess(data: ChildProcessDto) {
        return await this.rabbitmqService.sendChildProcess(data);
    };
};