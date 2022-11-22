//import packages
import { Injectable } from '@nestjs/common';

//import constants
import { SERVICE } from './monitor.constants';
//import dtos
import { CreateTaskDto } from '../task/task.dto';
import { ResendMonitorDto, WeekLogsDto } from './monitor.dto';
//import models
import { ScheduleExecutionLogModel } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
import { ScheduleSetupModel } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
//import services
import { LoggerService } from 'src/common/logger/logger.service';
import { TimeHelperService } from 'src/util/time/timeHelper.service';
import { JobQueueService } from '../jobQueue/jobQueue.service';
import { CreateScheduleExecutionLogDto } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.dto';

const {
    READ_METHOD,    //read()
    RESEND_METHOD,  //resend()
} = SERVICE;

@Injectable()
export class MonitorService {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleSetupModel: ScheduleSetupModel,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel,
        private readonly timeHelperService: TimeHelperService,
        private readonly jobQueueService: JobQueueService
    ) {
        this.logger.setContext(MonitorService.name);
    };

    async read(): Promise<WeekLogsDto[]> {
        try {
            this.logger.serviceDebug(READ_METHOD);
            const today = new Date();
            const { start, end } = this.timeHelperService.getWeekPeriod(today);
            const schedules = await this.scheduleSetupModel.readAll();
            const weekLogs: WeekLogsDto[] = await Promise.all(schedules.map(async schedule => {
                const { scheduleID } = schedule;
                const period = {
                    start: start,
                    end: end,
                    scheduleID: scheduleID
                };
                const documents = await this.scheduleExecutionLogModel.readPeriod(period);
                return {
                    scheduleID: schedule.scheduleID,
                    scheduleType: schedule.scheduleType,
                    schedule: schedule.cycle || schedule.regular,
                    weekLog: documents
                };
            }));
            return weekLogs;
        } catch (err) {
            throw err;
        };
    };

    resend(data: ResendMonitorDto): void {
        try {
            this.logger.serviceDebug(RESEND_METHOD);
            const { MQCLI } = data;
            const document: CreateScheduleExecutionLogDto = {
                ...data,
                processDatetime: new Date(),
                processStatus: 'ok'
            };
            this.scheduleExecutionLogModel.create(document);
            // const message = {
            //     pattern: 'resend',
            //     message: MQCLI
            // };
            this.jobQueueService.sendMessage(MQCLI);
        } catch (err) {
            throw err;
        };
    };
};