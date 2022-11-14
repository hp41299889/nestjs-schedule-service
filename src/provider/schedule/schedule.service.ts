import { Injectable, Logger } from '@nestjs/common';

import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from './schedule.dto';
import { ScheduleModelService } from 'src/model/postgre/schedule/schedule.service';
import { TaskService } from '../task/task.service';
import { Schedule } from 'src/model/postgre/schedule/schedule.entity';

@Injectable()
export class ScheduleService {
    constructor(
        private readonly scheduleModelService: ScheduleModelService,
        private readonly taskService: TaskService
    ) { }

    private readonly logger = new Logger(ScheduleService.name);
    private readonly debugMessage = 'Trying call ScheduleService.';

    create(data: CreateScheduleDto): object {
        this.logger.debug(`${this.debugMessage}create()`);
        try {
            return new Promise((resolve) => {
                resolve(this.taskService.create(data));
            }).then(() => {
                return this.scheduleModelService.create(data);
            }).then(() => {
                return { results: 'Success' };
            });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async readAll(): Promise<Schedule[]> {
        this.logger.debug(`${this.debugMessage}readAll()`);
        try {
            return await this.scheduleModelService.readAll();
        } catch (err) {
            this.logger.error(err);
            return err;
        }
    };

    async update(data: UpdateScheduleDto): Promise<object> {
        this.logger.debug(`${this.debugMessage}update()`);
        const { scheduleID } = data;
        try {
            const target = await this.scheduleModelService.read({ scheduleID });
            const { scheduleName, scheduleType } = target;
            const targetTask = {
                scheduleName: scheduleName,
                scheduleType: scheduleType,
                newData: data
            };
            return new Promise((resolve) => {
                resolve(this.taskService.update(targetTask));
            }).then(() => {
                return this.scheduleModelService.update(data);
            }).then(() => {
                return { results: 'Success' };
            })
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: DeleteScheduleDto): Promise<object> {
        this.logger.debug(`${this.debugMessage}delete()`);
        try {
            const target = await this.scheduleModelService.read(data);
            const { scheduleName, scheduleType } = target;
            const targetTask = {
                scheduleName: scheduleName,
                scheduleType: scheduleType
            };
            return new Promise((resolve) => {
                resolve(this.taskService.delete(targetTask));
            }).then(() => {
                return this.scheduleModelService.delete(target);
            }).then(() => {
                return { results: 'Success' };
            });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    // export() {

    // };
};