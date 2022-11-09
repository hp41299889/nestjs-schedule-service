import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleExecutionLog } from './scheduleExecutionLog.entity';
import { ScheduleExecutionLogService } from './scheduleExecutionLog.service';

@Module({
    imports: [TypeOrmModule.forFeature([ScheduleExecutionLog], 'postgresConnection')],
    providers: [ScheduleExecutionLogService],
    exports: [ScheduleExecutionLogService]
})
export class ScheduleExecutionLogModule { }