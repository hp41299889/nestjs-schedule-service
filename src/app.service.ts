import { Injectable } from '@nestjs/common';

import { PerfectCubicSumDto } from './math/perfectCubicSum.dto';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { ChildProcessDto } from './childProcess/childProcess.dto';
import { TaskService } from './task/task.service';
import { AddTaskDto, DeleteTaskDto } from './task/task.dto';

@Injectable()
export class AppService {
    constructor(
        private readonly rabbitmqService: RabbitmqService,
        private readonly taskService: TaskService
    ) {
    };
    private requestCount: number = 0;

    async perfectCubicSum(data: PerfectCubicSumDto) {
        return await this.rabbitmqService.sendPerfectCubicSum(data);
    };

    async childProcess(data: ChildProcessDto) {
        return await this.rabbitmqService.sendChildProcess(data);
    };

    async waitTest(id: number) {
        const waitTime = (Math.floor(Math.random() * 10) + 1) * 1000;
        this.requestCount++;
        console.log(`requestCount: ${this.requestCount}`);

        return new Promise(resvole => {
            setTimeout(() => {
                resvole(`your id is ${id},you wait ${waitTime}`);
            }, waitTime);
        });
    };

    async addCronJob(data: AddTaskDto) {
        return this.taskService.addCronJob(data);
    };

    async deleteCronJob(data: DeleteTaskDto) {
        return this.taskService.deleteCron(data);
    };

    async getCronJobs() {
        return await this.taskService.getCrons();
    };
};