//import packages
import { Module } from '@nestjs/common';

//import modules
import { LoggerModule } from 'src/common/logger/logger.module';
//import controllers
import { ExecutionLogController } from './executionLog.controller';
//import models
import { ScheduleExecutionLogModule } from 'src/model/mongo/ScheduleExecutionLog/ScheduleExecutionLog.module';
//import services
import { ExecutionLogService } from './executionLog.service';

@Module({
    imports: [
        LoggerModule,
        ScheduleExecutionLogModule
    ],
    controllers: [ExecutionLogController],
    providers: [ExecutionLogService],
    exports: [ExecutionLogService]
})
export class ExecutionLogModule { };