import { Injectable } from '@nestjs/common';

import { RabbitmqService } from 'src/provider/rabbitmq/rabbitmq.service';
import { PerfectCubicSumDto } from './math.dto';

@Injectable()
export class MathService {
    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { };

    async perfectCubicSum(data: PerfectCubicSumDto) {
        return await this.rabbitmqService.sendPerfectCubicSum(data);
    };
};