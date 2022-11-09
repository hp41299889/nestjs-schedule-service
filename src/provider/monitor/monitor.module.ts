import { Module } from '@nestjs/common';

import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { ScheduleExecutionLogModule } from 'src/model/postgre/scheduleExecutionLog/scheduleExecutionLog.module';

@Module({
  imports: [ScheduleExecutionLogModule],
  providers: [MonitorService],
  controllers: [MonitorController]
})
export class MonitorModule { }
