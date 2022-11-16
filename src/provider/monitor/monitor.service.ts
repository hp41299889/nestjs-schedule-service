//import packages
import { Injectable } from '@nestjs/common';

//import constants
import { SERVICE } from './monitor.constants';
//import dtos
import { CreateTaskDto } from '../task/task.dto';
//import models
import { ScheduleExecutionLogService } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
import { ScheduleSetupModelService } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
//import services
import { TaskService } from '../task/task.service';

const {

} = SERVICE;

@Injectable()
export class MonitorService {
    constructor(
        private readonly scheduleSetupModel: ScheduleSetupModelService,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogService,
        private readonly taskService: TaskService
    ) { };

    async read() {
        const schedules = await this.scheduleSetupModel.readAll();
        const weekLogs = await Promise.all(schedules.map(async schedule => {
            const documents = await this.scheduleExecutionLogModel.findWeek(schedule.scheduleID);
            return {
                scheduleID: schedule.scheduleID,
                scheduleType: schedule.scheduleType,
                schedule: schedule.cycle || schedule.regular,
                weeklog: documents
            };
        }));
        return weekLogs;
    };

    resend(data: any) {
        // TODO
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
    };
};