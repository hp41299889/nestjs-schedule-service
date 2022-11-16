//import packages
import { Controller } from '@nestjs/common';

//import services
import { ExecutionLogService } from './executionLog.service';

@Controller()
export class ExecutionLogController {
    constructor(
        private readonly executionLogService: ExecutionLogService
    ) { };

    query() {
        this.executionLogService.query();
    };
};