//import packages
import { Injectable } from '@nestjs/common';

//import constants
import { SERVICE } from './monitor.constants';
import { TASK } from 'src/provider/task/task.constants';
//import dtos
import { ResendMonitorDto, WeekLogsDto } from './monitor.dto';
//import models
import { ScheduleExecutionLogModel } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
import { ScheduleSetupModel } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
import { CreateScheduleExecutionLogDto } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.dto';
//import services
import { LoggerService } from 'src/common/logger/logger.service';
import { TimeHelperService } from 'src/util/time/timeHelper.service';
import { JobQueueService } from '../../provider/jobQueue/jobQueue.service';
import { ExecutionLogService } from '../executionLog/executionLog.service';
import { TaskService } from '../../provider/task/task.service';

const {
    READ_METHOD,    //read()
    RESEND_METHOD,  //resend()
} = SERVICE;

const {
    OK,     //
    WAITING,//
    ERROR,  //
} = TASK;

@Injectable()
export class MonitorService {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleSetupModel: ScheduleSetupModel,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel,
        private readonly timeHelperService: TimeHelperService,
        private readonly jobQueueService: JobQueueService,
        private readonly executionLogService: ExecutionLogService,
        private readonly taskService: TaskService
    ) {
        this.logger.setContext(MonitorService.name);
    };

    async read(): Promise<WeekLogsDto[]> {
        try {
            this.logger.serviceDebug(READ_METHOD);
            const today = new Date();
            const { start, end } = this.timeHelperService.getCurrentWeek(today);
            const schedules = await this.scheduleSetupModel.readAll();
            const weekLogs: WeekLogsDto[] = await Promise.all(schedules.map(async schedule => {
                const { scheduleID, scheduleType, scheduleName, MQCLI } = schedule;
                const period = {
                    start: start,
                    end: end,
                    scheduleID: scheduleID
                };
                const documents = await this.scheduleExecutionLogModel.readPeriod(period);
                const logs = await this.executionLogService.switchLogID(documents);
                const executeTimes = await this.taskService.buildWeekWaitingTasksTime(schedule);
                executeTimes.forEach(item => {
                    const { time, schedule } = item;
                    logs.push({
                        scheduleID: scheduleID,
                        scheduleName: scheduleName,
                        schedule: schedule,
                        scheduleType: scheduleType,
                        processDatetime: time,
                        processStatus: WAITING,
                        MQCLI: MQCLI
                    })
                });
                return {
                    scheduleID: schedule.scheduleID,
                    scheduleType: schedule.scheduleType,
                    schedule: schedule.cycle || schedule.regular,
                    weekLog: logs
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
                processStatus: OK
            };
            this.scheduleExecutionLogModel.create(document);
            this.jobQueueService.sendMessage(MQCLI);
        } catch (err) {
            throw err;
        };
    };
};