import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry, Interval } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { AddTaskDto, DeleteTaskDto } from './task.dto';

@Injectable()
export class TaskService {
    constructor(
        private schedulerRegistry: SchedulerRegistry
    ) { };

    private readonly logger = new Logger(TaskService.name);

    addCronJob(data: AddTaskDto) {
        //now v2 is interval
        const { name, seconds, message } = data;
        const callback = () => {
            this.logger.warn(`Interval ${name} executing at time (${seconds}), Said ${message}`);
        };
        const interval = setInterval(callback, seconds);

        this.schedulerRegistry.addInterval(name, interval);
    };

    deleteCron(data: DeleteTaskDto) {
        //now v2 is interval
        const { name } = data;
        this.schedulerRegistry.deleteInterval(name);
        this.logger.warn(`Interval ${name} deleted!`);
    };

    async getCrons() {
        const jobs = this.schedulerRegistry.getCronJobs();
        const crons = [];
        return new Promise((resolve) => {
            jobs.forEach((value, key, map) => {
                const { source } = value['cronTime'];
                let next;
                try {
                    next = value.nextDates().toISODate();
                } catch (e) {
                    next = 'error: next fire date is in the past!';
                }
                this.logger.log(`job: ${key} -> next: ${next}`);
                crons.push({ 'jobName': key, 'source': source });
            });
            resolve(crons);
        });
    };
};