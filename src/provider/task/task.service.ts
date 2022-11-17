//import packages
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry, Interval } from '@nestjs/schedule';
import { CronJob } from 'cron';

//import constants
import { SERVICE } from './task.constants';
//import dtos
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto } from './task.dto';
import { CreateScheduleExecutionLogDto } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.dto';
//import models
import { ScheduleExecutionLogModel } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
//import services
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

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
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly rabbitmqService: RabbitmqService,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel
    ) { };
    private readonly logger = new Logger(TaskService.name);

    create(data: CreateTaskDto): void {
        const { scheduleID, scheduleName, scheduleType, cycle, regular } = data;
        this.logger.debug(`${CREATE_METHOD}`);
        try {
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
                    };
                    const interval = setInterval(task, executeTime);
                    this.schedulerRegistry.addInterval(`${scheduleName}_${item}`, interval);
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
                    });
                    this.schedulerRegistry.addCronJob(`${scheduleName}_${item}`, task);
                    task.start();
                });
            };
            const message = {
                pattern: CREATE_PATTERN,
                message: data
            };
            this.rabbitmqService.sendMessage(message);
        } catch (err) {
            this.logger.error(err);
        };
    };

    async update(data: UpdateTaskDto): Promise<void> {
        try {
            this.logger.debug(`${UPDATE_METHOD}`);
            const { oldTask, newData } = data;
            // const newTask: CreateTaskDto = { ...oldTask };
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
            const message = {
                pattern: UPDATE_PATTERN,
                message: data
            };
            this.rabbitmqService.sendMessage(message);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: DeleteTaskDto): Promise<void> {
        try {
            this.logger.debug(`${DELETE_METHOD}`);
            const { scheduleName, scheduleType } = data;
            if (scheduleType === SCHEDULE_TYPE_CYCLE) {
                this.schedulerRegistry.deleteInterval(scheduleName);
            } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
                this.schedulerRegistry.deleteCronJob(scheduleName);
            };
            const message = {
                pattern: DELETE_PATTERN,
                message: data
            }
            this.rabbitmqService.sendMessage(message);
        } catch (err) {
            this.logger.error(err);
        };
    };

    splitExecuteTime(schduleType: string, cycle?: string, regular?: string): string | number {
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
    };
};