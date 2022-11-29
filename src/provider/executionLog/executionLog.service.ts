//import packages
import { BadRequestException, Injectable } from '@nestjs/common'

//import constants
import { SERVICE } from './executionLog.constants';
//import dtos
import { ExecutionLogsDto, QueryDto } from './executionLog.dto'
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
            const today = new Date(startDate);
            switch (dateInterval) {
                case 'day': {
                    const period = this.timeHelperServuice.getDayPeriod(today);
                    const documents = await this.scheduleExecutionLogModel.readPeriod(period);
                    const logs = await this.switchLogID(documents);
                    return logs;
                };
                case 'week': {
                    const period = this.timeHelperServuice.getWeekPeriod(today);
                    const documents = await this.scheduleExecutionLogModel.readPeriod(period);
                    const logs = await this.switchLogID(documents);
                    return logs;
                };
                case 'month': {
                    const period = this.timeHelperServuice.getMonthPeriod(today);
                    const documents = await this.scheduleExecutionLogModel.readPeriod(period);
                    const logs = await this.switchLogID(documents);
                    return logs;
                };
                case 'year': {
                    const period = this.timeHelperServuice.getYearPeriod(today);
                    const documents = await this.scheduleExecutionLogModel.readPeriod(period);
                    const logs = await this.switchLogID(documents);
                    return logs;
                };
            };
        } catch (err) {
            throw err;
        };
    };

    async switchLogID(data: ScheduleExecutionLog[]): Promise<ExecutionLogsDto[]> {
        const logs: ExecutionLogsDto[] = data.map(document => {
            const log: ExecutionLogsDto = {
                scheduleLogID: document['_id'],
                ...document['_doc']
            };
            delete log['_id'];
            delete log['__v'];
            return log;
        });
        return logs;
    };
};