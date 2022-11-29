//import packages
import { Module } from '@nestjs/common';

//import modules
import { AuthModule } from '../service/auth/auth.module';
import { ExecutionLogModule } from '../service/executionLog/executionLog.module';
import { MonitorModule } from '../service/monitor/monitor.module';
import { ScheduleModule } from '../service/schedule/schedule.module';
import { ScheduleQueueModule } from './scheduleQueue/scheduleQueue.module';
import { SetupModule } from '../service/setup/setup.module';

@Module({
    imports: [
        AuthModule,
        MonitorModule,
        ScheduleModule,
        SetupModule,
        ExecutionLogModule,
        ScheduleQueueModule
    ]
})
export class ProviderModule { }