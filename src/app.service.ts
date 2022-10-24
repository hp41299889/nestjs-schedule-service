import { Injectable } from '@nestjs/common';

import { PerfectCubicSumDto } from './math/perfectCubicSum.dto';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Injectable()
export class AppService {
    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { };

    async perfectCubicSum(data: PerfectCubicSumDto) {
        return await this.rabbitmqService.sendPerfectCubicSum(data);
    };
};