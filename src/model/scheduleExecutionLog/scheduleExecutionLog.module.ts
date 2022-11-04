import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleExecutionLog } from './scheduleExecutionLog.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ScheduleExecutionLog])
    ]
})
export class ScheduleExecutionLogModule { }