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
import { TimeHelperService } from 'src/util/time/timeHelper.service';

const {
    QUERY_METHOD    //query()
} = SERVICE;

@Injectable()
export class ExecutionLogService {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel,
        private readonly timeHelperServuice: TimeHelperService
    ) {
        this.logger.setContext(ExecutionLogService.name);
    };
    async query(data: QueryDto): Promise<ScheduleExecutionLog[]> {
        try {
            this.logger.serviceDebug(QUERY_METHOD);
            const { startDate, dateInterval } = data;
            switch (dateInterval) {
                case 'day': {
                    const period = this.timeHelperServuice.getDayPeriod();
                    return await this.scheduleExecutionLogModel.readPeriod(period);
                };
                case 'week': {
                    const period = this.timeHelperServuice.getWeekPeriod();
                    return await this.scheduleExecutionLogModel.readPeriod(period);
                };
                case 'month': {
                    const period = this.timeHelperServuice.getMonthPeriod();
                    return await this.scheduleExecutionLogModel.readPeriod(period);
                };
                case 'year': {
                    const period = this.timeHelperServuice.getYearPeriod();
                    return await this.scheduleExecutionLogModel.readPeriod(period);
                };
            };
        } catch (err) {
            throw err;
        };
    };
};