import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { AddTaskDto, DeleteTaskDto } from './task.dto';

@Injectable()
export class TaskService {
    constructor(
        private schedulerRegistry: SchedulerRegistry
    ) { };

    private readonly logger = new Logger(TaskService.name);

    // @Cron(CronExpression.EVERY_10_SECONDS)
    // handleCron() {
    //     this.logger.debug('Called every 10 secs');
    // };

    addCronJob(data: AddTaskDto) {
        const { name, seconds } = data;
        const job = new CronJob(`${seconds} * * * * *`, () => {
            this.logger.warn(`time (${seconds}) for job ${name} to run!`)
        });

        this.schedulerRegistry.addCronJob(name, job);
        job.start();

        this.logger.warn(
            `job ${name} added for each minute at ${seconds} seconds`
        );
    };

    deleteCron(data: DeleteTaskDto) {
        const { name } = data;
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`);
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