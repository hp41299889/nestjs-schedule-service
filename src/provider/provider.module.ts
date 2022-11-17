//import packages
import { Module } from '@nestjs/common';

//import modules
import { AuthModule } from './auth/auth.module';
import { ExecutionLogModule } from './executionLog/executionLog.module';
import { MonitorModule } from './monitor/monitor.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SetupModule } from './setup/setup.module';

@Module({
    imports: [
        AuthModule,
        MonitorModule,
        ScheduleModule,
        SetupModule,
        ExecutionLogModule,
    ]
})
export class ProviderModule { }