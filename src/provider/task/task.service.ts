import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry, Interval } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto } from './task.dto';
import { SERVICE } from './task.constants';

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
        private readonly rabbitmqService: RabbitmqService
    ) { };
    private readonly logger = new Logger(TaskService.name);

    async create(data: CreateTaskDto): Promise<void> {
        const { scheduleName, scheduleType, cycle, regular } = data;
        this.logger.debug(`${DEBUG_MESSAGE} ${CREATE_FUNCTION}`);
        try {
            if (scheduleType === SCHEDULE_TYPE_CYCLE) {
                const period = this.splitPeriod(scheduleType, cycle);
                const task = () => {
                    this.logger.warn(`${TASK_MESSAGE_CYCLE} ${scheduleName}`);
                    this.logger.warn({ data });
                };
                const interval = setInterval(task, +period);
                this.schedulerRegistry.addInterval(scheduleName, interval);
            } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
                const period = this.splitPeriod(scheduleType, null, regular).toString();
                const task = new CronJob(period, () => {
                    this.logger.warn(`${TASK_MESSAGE_REGULAR} ${scheduleName}`);
                    this.logger.warn({ data });
                });
                this.schedulerRegistry.addCronJob(scheduleName, task);
            };
            this.rabbitmqService.sendMessage(CREATE_PATTERN, data);
            this.logger.debug(`${DEBUG_MESSAGE_SUCCESS} ${CREATE_FUNCTION}`)
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

    splitPeriod(schduleType: string, cycle?: string[], regular?: string[]): string | number {
        if (schduleType === SCHEDULE_TYPE_CYCLE) {
            const cycleSplit = cycle[0].split('#')[1].split('/');
            return Number(cycleSplit[0]) * 60000 * 60 + Number(cycleSplit[1]) * 60000;
        } else if (schduleType === SCHEDULE_TYPE_REGULAR) {
            //TODO
        };
    };
};