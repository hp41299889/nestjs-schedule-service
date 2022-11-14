import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry, Interval } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { CreateScheduleDto, UpdateScheduleDto, DeleteScheduleDto } from '../schedule/schedule.dto';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { UpdateTaskDto, DeleteTaskDto } from './task.dto';
import { Schedule } from 'src/model/postgre/schedule/schedule.entity';

@Injectable()
export class TaskService {
    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly rabbitmqService: RabbitmqService,
    ) { };
    private readonly logger = new Logger(TaskService.name);
    private readonly debugMessage = 'Trying call TaskService.';

    create(data: CreateScheduleDto): void {
        const { scheduleName, scheduleType, cycle, regular } = data;
        this.logger.debug(`${this.debugMessage}create()`);
        try {
            if (scheduleType === 'cycle') {
                const period = this.splitPeriod(scheduleType, cycle);
                const task = () => {
                    this.logger.warn(`Do cycle task ${scheduleName}`);
                    this.logger.warn({ data });
                };
                const interval = setInterval(task, +period);
                this.schedulerRegistry.addInterval(scheduleName, interval);
            } else if (scheduleType === 'regular') {
                const period = this.splitPeriod(scheduleType, null, regular).toString();
                const task = new CronJob(period, () => {
                    this.logger.warn(`Do regular task ${scheduleName}`);
                    this.logger.warn({ data });
                });
                this.schedulerRegistry.addCronJob(scheduleName, task);
            };
            this.rabbitmqService.sendMessage('create', data);
        } catch (err) {
            this.logger.error(err);
        };
    };

    async update(data: UpdateTaskDto): Promise<void> {
        //TODO
        const { scheduleName, scheduleType, newData } = data;
        const target = {
            scheduleName: scheduleName,
            scheduleType: scheduleType
        };
        try {
            if (scheduleType === 'cycle') {
                await this.delete(target);
                this.create(newData);
            } else if (scheduleType === 'regular') {

            };
            this.logger.debug('Update task success!');
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: DeleteTaskDto): Promise<void> {
        const { scheduleName, scheduleType } = data;
        this.logger.debug(`${this.debugMessage}delete()`);
        try {
            if (scheduleType === 'cycle') {
                this.schedulerRegistry.deleteInterval(scheduleName);
            } else if (scheduleType === 'reqular') {
                this.schedulerRegistry.deleteCronJob(scheduleName);
            };
            this.logger.debug('Delete task success!');
        } catch (err) {
            this.logger.error(err);
        };
    };

    splitPeriod(schduleType: string, cycle?: string[], regular?: string[]): string | number {
        if (schduleType === 'cycle') {
            const cycleSplit = cycle[0].split('#')[1].split('/');
            return Number(cycleSplit[0]) * 60000 * 60 + Number(cycleSplit[1]) * 60000;
        } else if (schduleType === 'regular') {
            //TODO
        };
    };
};