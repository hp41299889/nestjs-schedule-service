//import packages
import { Injectable } from '@nestjs/common';

//import constants
import { SERVICE } from './monitor.constants';
//import dtos
import { CreateTaskDto } from '../task/task.dto';
//import models
import { ScheduleExecutionLogModel } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
import { ScheduleSetupModel } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
//import services
import { TaskService } from '../task/task.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    READ_METHOD,
    RESEND_METHOD
} = SERVICE;

@Injectable()
export class MonitorService {
    constructor(
        private readonly logger: LoggerService,
        private readonly scheduleSetupModel: ScheduleSetupModel,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel,
        private readonly taskService: TaskService
    ) {
        this.logger.setContext(MonitorService.name);
    };

    async read() {
        try {
            this.logger.serviceDebug(READ_METHOD);
            const nowDay = new Date();
            const startDate = new Date(nowDay.setDate(nowDay.getDate() - nowDay.getDay() + 1));
            const start = new Date(startDate.setHours(0, 0, 0, 0));
            const temp = new Date(start);
            const end = new Date(new Date(temp.setDate(temp.getDate() + 6)).setHours(23, 59, 59, 999));
            const period = {
                start: start,
                end: end
            };
            const schedules = await this.scheduleSetupModel.readAll();
            const weekLogs = await Promise.all(schedules.map(async schedule => {
                const documents = await this.scheduleExecutionLogModel.readPeriod(period);
                return {
                    scheduleID: schedule.scheduleID,
                    scheduleType: schedule.scheduleType,
                    schedule: schedule.cycle || schedule.regular,
                    weeklog: documents
                };
            }));
            return weekLogs;
        } catch (err) {
            throw err;
        };
    };

    resend(data: any) {
        //TODO
        try {
            this.logger.serviceDebug(RESEND_METHOD);
            const task: CreateTaskDto = {
                scheduleID: data.scheduleID,
                scheduleName: data.scheduleName,
                scheduleType: data.scheduleType,
                MQCLI: data.MQCLI,
                commandSource: '',
                cycle: [],
                regular: []
            }
            this.taskService.create(task);
        } catch (err) {
            throw err;
        };
    };
};