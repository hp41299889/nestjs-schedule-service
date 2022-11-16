//import packages
import { Module } from '@nestjs/common';

//import controllers
import { ExecutionLogController } from './executionLog.controller';
//import services
import { ExecutionLogService } from './executionLog.service';

@Module({
    controllers: [ExecutionLogController],
    providers: [ExecutionLogService],
    exports: [ExecutionLogService]
})
export class ExecutionLogModule { };