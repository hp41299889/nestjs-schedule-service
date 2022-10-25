import { Injectable } from '@nestjs/common';

import { PerfectCubicSumDto } from './math/perfectCubicSum.dto';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { ChildProcessDto } from './childProcess/childProcess.dto';

@Injectable()
export class AppService {
    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { };

    async perfectCubicSum(data: PerfectCubicSumDto) {
        return await this.rabbitmqService.sendPerfectCubicSum(data);
    };

    async childProcess(data: ChildProcessDto) {
        return await this.rabbitmqService.sendChildProcess(data);
    };
};