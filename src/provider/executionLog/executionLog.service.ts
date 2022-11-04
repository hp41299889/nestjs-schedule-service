import { Injectable } from '@nestjs/common';

import { QueryExecutionLogDto } from './executionLog.dto';
import * as CONST from './excutionLog.consants';

@Injectable()
export class ExecutionLogService {
    query(data: QueryExecutionLogDto) {
        //TODO
    };

    export() {

    };
};