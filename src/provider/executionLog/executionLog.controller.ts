import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ExecutionLogService } from './executionLog.service';
import { QueryExecutionLogDto } from './executionLog.dto';
import * as CONST from './excutionLog.consants';

@ApiTags(CONST.API_TAGS)
@Controller(CONST.API_ROUTES)
export class ExecutionLogController {
    constructor(
        private readonly executionLogService: ExecutionLogService
    ) { };

    @Post(CONST.QUERY)
    query(@Body() data: QueryExecutionLogDto) {
        return this.executionLogService.query(data);
    };
};