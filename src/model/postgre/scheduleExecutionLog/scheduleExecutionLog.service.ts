import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { ScheduleExecutionLog } from './scheduleExecutionLog.entity';

@Injectable()
export class ScheduleExecutionLogService {
    constructor(
        // @InjectRepository(ScheduleExecutionLog)
        // private readonly scheduleExecutionLogRepository: Repository<ScheduleExecutionLog>,
        @InjectDataSource('postgresConnection')
        private readonly dataSource: DataSource
    ) { };

    async read() {
        const c = this.dataSource.createQueryRunner();
        console.log(await c.getTable('schedule_execution_log'));

        return 'this.dataSource.createQueryRunner();'
    };
};