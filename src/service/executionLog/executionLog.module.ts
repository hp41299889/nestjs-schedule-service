//import packages
import { Module } from '@nestjs/common';

//import modules
import { LoggerModule } from 'src/common/logger/logger.module';
import { TimeHelperModule } from 'src/util/time/timeHelper.module';
//import controllers
import { ExecutionLogController } from './executionLog.controller';
//import models
import { ScheduleExecutionLogModelModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
//import services
import { ExecutionLogService } from './executionLog.service';

@Module({
    imports: [
        LoggerModule,
        ScheduleExecutionLogModelModule,
        TimeHelperModule
    ],
    controllers: [ExecutionLogController],
    providers: [ExecutionLogService],
    exports: [ExecutionLogService]
})
export class ExecutionLogModule { };