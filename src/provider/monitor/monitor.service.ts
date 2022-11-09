import { Injectable } from '@nestjs/common';

import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { ResendMonitorDto } from './monitor.dto';
import * as CONST from './monitor.constants';
import { ScheduleExecutionLogService } from 'src/model/postgre/scheduleExecutionLog/scheduleExecutionLog.service';

@Injectable()
export class MonitorService {
    constructor(
        private readonly scheduleExecutionLogService: ScheduleExecutionLogService
    ) { };

    read() {
        return this.scheduleExecutionLogService.read();
    };

    resend(data: ResendMonitorDto) {
        const cmd = CONST.RESEND;
        // TODO
    };
};