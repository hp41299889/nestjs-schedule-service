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
    QUERY_METHOD    //query()
} = SERVICE;

@Injectable()
export class ExecutionLogService {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel
    ) {
        this.logger.setContext(ExecutionLogService.name);
    };
    //TODO 前一周為當天往前推算7天 ...
    async query(data: QueryDto): Promise<ScheduleExecutionLog[]> {
        try {
            this.logger.serviceDebug(QUERY_METHOD);
            const { startDate, dateInterval } = data;
            const nowDay = new Date(startDate);
            switch (dateInterval) {
                case 'day': {
                    const start = new Date(nowDay.setDate(nowDay.getDate() - 1));
                    const endDate = new Date(start);
                    const end = new Date(endDate.setHours(23, 59, 59, 999));
                    const period = {
                        start: start,
                        end: end
                    };
                    return await this.scheduleExecutionLogModel.readPeriod(period);
                };
                case 'week': {
                    const start = new Date(nowDay.setDate(nowDay.getDate() - 7 - nowDay.getDay() + 1));
                    const endDate = new Date(start);
                    const end = new Date(new Date(endDate.setDate(start.getDate() + 6)).setHours(23, 59, 59, 999));
                    const period = {
                        start: start,
                        end: end
                    };
                    return await this.scheduleExecutionLogModel.readPeriod(period);
                };
                case 'month': {
                    const start = new Date(new Date(nowDay.setMonth(nowDay.getMonth() - 1)).setDate(1));
                    const endDate = new Date(start);
                    const endDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
                    const end = new Date(endDay.setHours(23, 59, 59, 999));
                    const period = {
                        start: start,
                        end: end
                    };
                    return await this.scheduleExecutionLogModel.readPeriod(period);
                };
                case 'year': {
                    const start = new Date(nowDay.getFullYear() - 1, 0, 1);
                    const endDate = new Date(start);
                    const end = new Date(endDate.getFullYear(), 11, 31, 23, 59, 59, 999);
                    const period = {
                        start: start,
                        end: end
                    };
                    return await this.scheduleExecutionLogModel.readPeriod(period);
                };
            };
        } catch (err) {
            throw err;
        };
    };
};