//import packages
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

//import constants
import { SERVICE } from './task.constants';
//import dtos
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto } from './task.dto';
//import models
import { CreateScheduleExecutionLogDto } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.dto';
import { ScheduleExecutionLogModel } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
import { ScheduleSetupModel } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
//import services
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { LoggerService } from 'src/common/logger/logger.service';

const {
    CREATE_METHOD,        //
    CREATE_PATTERN,         //
    UPDATE_METHOD,        //
    UPDATE_PATTERN,         //
    DELETE_METHOD,        //
    DELETE_PATTERN,         //
    SCHEDULE_TYPE_CYCLE,    //
    SCHEDULE_TYPE_REGULAR,  //
    TASK_MESSAGE_CYCLE,     //
    TASK_MESSAGE_REGULAR,   //
} = SERVICE;

@Injectable()
export class TaskService {
    constructor(
        private readonly logger: LoggerService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly rabbitmqService: RabbitmqService,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel,
        private readonly scheduleSetupModel: ScheduleSetupModel
    ) {
        this.logger.setContext(TaskService.name);
    };

    create(data: CreateTaskDto): void {
        try {
            this.logger.serviceDebug(`${CREATE_METHOD}`);
            const { scheduleID, scheduleName, scheduleType, cycle, regular } = data;
            if (scheduleType === SCHEDULE_TYPE_CYCLE) {
                cycle.forEach((item, index, array) => {
                    const executeTime = Number(this.splitExecuteTime(scheduleType, item));
                    const task = () => {
                        this.logger.warn(`${TASK_MESSAGE_CYCLE} ${scheduleName}`);
                        this.logger.warn({ data });
                        const createdLog: CreateScheduleExecutionLogDto = {
                            ...data,
                            scheduleID: scheduleID,
                            schedule: item,
                            processDatetime: new Date(),
                            processStatus: 'ok'
                        };
                        this.scheduleExecutionLogModel.create(createdLog);
                        const message = {
                            pattern: data.active,
                            message: data
                        };
                        this.rabbitmqService.sendMessage(message);
                    };
                    const interval = setInterval(task, executeTime);
                    const taskName = `${scheduleName}_${item}`;
                    this.schedulerRegistry.addInterval(taskName, interval);
                });
            } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
                regular.forEach((item, index, array) => {
                    const executeTime = this.splitExecuteTime(scheduleType, null, item).toString();
                    const task = new CronJob(executeTime, () => {
                        this.logger.warn(`${TASK_MESSAGE_REGULAR} ${scheduleName}`);
                        this.logger.warn({ data });
                        const createdLog: CreateScheduleExecutionLogDto = {
                            ...data,
                            scheduleID: scheduleID,
                            schedule: item,
                            processDatetime: new Date(),
                            processStatus: 'ok'
                        };
                        this.scheduleExecutionLogModel.create(createdLog);
                        const message = {
                            pattern: data.active,
                            message: data
                        };
                        this.rabbitmqService.sendMessage(message);
                    });
                    const taskName = `${scheduleName}_${item}`;
                    this.schedulerRegistry.addCronJob(taskName, task);
                    task.start();
                });
            } else {
                throw 'scheduleType error';
            };
        } catch (err) {
            throw err;
        };
    };

    async update(data: UpdateTaskDto): Promise<void> {
        try {
            this.logger.serviceDebug(`${UPDATE_METHOD}`);
            const { oldTask, newData } = data;
            const newTask: CreateTaskDto = {
                commandSource: oldTask.commandSource,
                scheduleName: oldTask.scheduleName,
                scheduleType: oldTask.scheduleType,
                regular: oldTask.regular,
                cycle: oldTask.cycle,
                MQCLI: oldTask.MQCLI
            };
            Object.keys(newData).map(key => {
                newTask[key] = newData[key];
            });
            await this.delete(oldTask);
            this.create(newTask);
        } catch (err) {
            throw err;
        };
    };

    async delete(data: DeleteTaskDto): Promise<void> {
        try {
            this.logger.serviceDebug(`${DELETE_METHOD}`);
            const { scheduleName, scheduleType } = data;
            if (scheduleType === SCHEDULE_TYPE_CYCLE) {
                const { cycle } = data;
                cycle.forEach((item, index, array) => {
                    const taskName = `${scheduleName}_${item}`;
                    this.schedulerRegistry.deleteInterval(taskName);
                });
            } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
                const { regular } = data;
                regular.forEach((item, index, array) => {
                    const taskName = `${scheduleName}_${item}`;
                    this.schedulerRegistry.deleteCronJob(taskName);
                });
            };
        } catch (err) {
            throw err;
        };
    };

    async rebornTasks() {
        try {
            const schedules = await this.scheduleSetupModel.readAll();
            schedules.forEach((item, index, array) => {
                this.create(item);
            });
            console.log(this.schedulerRegistry.getCronJobs());
            console.log(this.schedulerRegistry.getIntervals());


        } catch (err) {
            throw err;
        };
    };

    splitExecuteTime(schduleType: string, cycle?: string, regular?: string): string | number {
        try {
            if (schduleType === SCHEDULE_TYPE_CYCLE) {
                const cycleSplit = cycle.split('#')[1].split('/');
                const hour = Number(cycleSplit[0]) * 1000 * 60 * 60;
                const minute = Number(cycleSplit[1]) * 1000 * 60;
                return hour + minute;
            } else if (schduleType === SCHEDULE_TYPE_REGULAR) {
                const regularSplit = regular.split('#')[1].split('/');
                const weekday = regularSplit[0];
                const hour = regularSplit[1];
                const minute = regularSplit[2];
                return `0 ${minute} ${hour} * * ${weekday}`;
            };
        } catch (err) {
            throw err;
        };
    };
};