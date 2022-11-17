//import packages
import { BadRequestException, Injectable } from '@nestjs/common'

//import constants
import { SERVICE } from './executionLog.constants';
//import dtos
import { QueryDto } from './executionLog.dto'
//import models
import { ScheduleExecutionLogModel } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
import { ScheduleExecutionLog } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.schema';
//impoer services
import { LoggerService } from 'src/common/logger/logger.service';

const {
    QUERY_METHOD    //
} = SERVICE;

@Injectable()
export class ExecutionLogService {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel
    ) {
        this.logger.setContext(ExecutionLogService.name);
    };

    async query(data: QueryDto): Promise<ScheduleExecutionLog[]> {
        try {
            this.logger.serviceDebug(QUERY_METHOD);
            const { startDate, dateInterval } = data;
            const nowDay = new Date(startDate);
            let start: Date;
            let end: Date;
            let documents: ScheduleExecutionLog[]
            switch (dateInterval) {
                case 'day': {
                    start = new Date(nowDay.setDate(nowDay.getDate() - 1));
                    const endDate = new Date(start);
                    end = new Date(endDate.setHours(23, 59, 59, 999));
                    const period = {
                        start: start,
                        end: end
                    };
                    documents = await this.scheduleExecutionLogModel.readPeriod(period);
                    break;
                };
                case 'week': {
                    break;
                };
                case 'month': {
                    break;
                };
                case 'year': {
                    break;
                };
            };
            return documents;
        } catch (err) {
            this.logger.errorMessage(err);
            throw new BadRequestException(err);
        };
    };
};