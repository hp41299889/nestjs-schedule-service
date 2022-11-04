import { Injectable } from '@nestjs/common';

import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { ResendMonitorDto } from './monitor.dto';
import * as CONST from './monitor.constants';

@Injectable()
export class MonitorService {
    constructor(
        // private readonly rabbitmqService: RabbitmqService
    ) { };

    read() {
        //TODO
    };

    resend(data: ResendMonitorDto) {
        const cmd = CONST.RESEND;
        // TODO
    };
};