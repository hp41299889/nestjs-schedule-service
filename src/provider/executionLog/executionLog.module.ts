import { Module } from '@nestjs/common';
import { ExecutionLogService } from './executionLog.service';
import { ExecutionLogController } from './executionLog.controller';

@Module({
  providers: [ExecutionLogService],
  controllers: [ExecutionLogController]
})
export class ExecutionLogModule { }
