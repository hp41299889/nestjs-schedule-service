import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScheduleExecutionLog } from './scheduleExecutionLog.entity';

@Injectable()
export class ScheduleExecutionLogService {
    constructor(
        @InjectRepository(ScheduleExecutionLog) private readonly scheduleExecutionLogRepository: Repository<ScheduleExecutionLog>
    ) { };

    read() {
        return this.scheduleExecutionLogRepository.find();
    };
};