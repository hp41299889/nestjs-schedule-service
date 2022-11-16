//import packages
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry, Interval } from '@nestjs/schedule';
import { CronJob } from 'cron';

//import constants
import { SERVICE } from './task.constants';
//import dtos
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto } from './task.dto';
import { CreateScheduleExecutionLogDto } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.dto';
//import services
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { ScheduleExecutionLogService } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';

const {
    DEBUG_MESSAGE,          //
    DEBUG_MESSAGE_SUCCESS,  //
    CREATE_FUNCTION,        //
    CREATE_PATTERN,         //
    UPDATE_FUNCTION,        //
    UPDATE_PATTERN,         //
    DELETE_FUNCTION,        //
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
        private readonly scheduleExecutionLogService: ScheduleExecutionLogService
    ) { };
    private readonly logger = new Logger(TaskService.name);

    create(data: CreateTaskDto): void {
        const { scheduleID, scheduleName, scheduleType, cycle, regular } = data;
        this.logger.debug(`${DEBUG_MESSAGE} ${CREATE_FUNCTION}`);
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
                        this.scheduleExecutionLogService.create(createdLog);
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
                        this.scheduleExecutionLogService.create(createdLog);
                    });
                    this.schedulerRegistry.addCronJob(`${scheduleName}_${item}`, task);
                    task.start();
                });
            };
            this.rabbitmqService.sendMessage(CREATE_PATTERN, data);
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${CREATE_FUNCTION}`);
        } catch (err) {
            this.logger.error(err);
        };
    };

    async update(data: UpdateTaskDto): Promise<void> {
        this.logger.debug(`${DEBUG_MESSAGE} ${UPDATE_FUNCTION}`);
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
        try {
            await this.delete(oldTask);
            this.create(newTask);
            this.rabbitmqService.sendMessage(UPDATE_PATTERN, data);
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${UPDATE_FUNCTION}`);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: DeleteTaskDto): Promise<void> {
        this.logger.debug(`${DEBUG_MESSAGE} ${DELETE_FUNCTION}`);
        const { scheduleName, scheduleType } = data;
        try {
            if (scheduleType === SCHEDULE_TYPE_CYCLE) {
                this.schedulerRegistry.deleteInterval(scheduleName);
            } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
                this.schedulerRegistry.deleteCronJob(scheduleName);
            };
            this.rabbitmqService.sendMessage(DELETE_PATTERN, data);
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${DELETE_FUNCTION}`);
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