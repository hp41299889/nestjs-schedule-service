//import packages
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

//import constants
import { SERVICE, CRONWEEKDAY } from './task.constants';
//import dtos
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto, TaskExecuteDto } from './task.dto';
//import models
import { CreateScheduleExecutionLogDto } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.dto';
import { ScheduleExecutionLogModel } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
import { ScheduleSetupModel } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
//import services
import { JobQueueService } from '../jobQueue/jobQueue.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { JsonService } from 'src/config/json/json.service';

const {
    CREATE_METHOD,          //create()
    UPDATE_METHOD,          //update()
    DELETE_METHOD,          //delete()
    SCHEDULE_TYPE_CYCLE,    //cycle
    SCHEDULE_TYPE_REGULAR,  //regular
    TASK_MESSAGE_CYCLE,     //Message when cycle task execute
    TASK_MESSAGE_REGULAR,   //Message when regular task execute
} = SERVICE;

@Injectable()
export class TaskService {
    constructor(
        private readonly logger: LoggerService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly jobQueueService: JobQueueService,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel,
        private readonly scheduleSetupModel: ScheduleSetupModel,
        private readonly jsonService: JsonService
    ) {
        this.logger.setContext(TaskService.name);
    };

    private readonly isScheduleOn = this.jsonService.read('enableScheduleService');
    private readonly taskCount = { interval: 0, cronJob: 0 };


    create(data: CreateTaskDto): void {
        if (!this.isScheduleOn) {
            this.logger.serviceDebug('enableScheduleService is false');
            throw 'enableScheduleService is false';
        } else {
            try {
                this.logger.serviceDebug(`${CREATE_METHOD}`);
                const { scheduleID, scheduleName, scheduleType, cycle, regular, MQCLI } = data;
                if (scheduleType === SCHEDULE_TYPE_CYCLE) {
                    cycle.forEach((item, index, array) => {
                        const taskExecute: TaskExecuteDto = {
                            scheduleType: scheduleType,
                            cycle: item
                        };
                        const executeTime = Number(this.splitExecuteTime(taskExecute));
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
                            this.jobQueueService.sendMessage(MQCLI);
                        };
                        const interval = setInterval(task, executeTime);
                        const taskName = `${scheduleName}_${item}`;
                        this.schedulerRegistry.addInterval(taskName, interval);
                        this.taskCount.interval++;
                    });
                } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
                    regular.forEach((item, index, array) => {
                        const taskExecute: TaskExecuteDto = {
                            scheduleType: scheduleType,
                            regular: item
                        }
                        const executeTime = this.splitExecuteTime(taskExecute).toString();
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
                            this.jobQueueService.sendMessage(MQCLI);
                        });
                        const taskName = `${scheduleName}_${item}`;
                        this.schedulerRegistry.addCronJob(taskName, task);
                        this.taskCount.cronJob++;
                        task.start();
                    });
                } else {
                    throw 'scheduleType error';
                };
            } catch (err) {
                throw err;
            };
        };
    };

    async update(data: UpdateTaskDto): Promise<void> {
        if (!this.isScheduleOn) {
            this.logger.warn('enableScheduleService is false');
            throw 'enableScheduleService is false';
        } else {
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
    };

    async delete(data: DeleteTaskDto): Promise<void> {
        if (!this.isScheduleOn) {
            this.logger.serviceDebug('enableScheduleService is false');
            throw 'enableScheduleService is false';
        } else {
            try {
                this.logger.serviceDebug(`${DELETE_METHOD}`);
                const { scheduleName, scheduleType } = data;
                if (scheduleType === SCHEDULE_TYPE_CYCLE) {
                    const { cycle } = data;
                    cycle.forEach((item, index, array) => {
                        const taskName = `${scheduleName}_${item}`;
                        this.schedulerRegistry.deleteInterval(taskName);
                        this.taskCount.interval--;
                    });
                } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
                    const { regular } = data;
                    regular.forEach((item, index, array) => {
                        const taskName = `${scheduleName}_${item}`;
                        this.schedulerRegistry.deleteCronJob(taskName);
                        this.taskCount.cronJob--;
                    });
                };
            } catch (err) {
                throw err;
            };
        };
    };

    async rebornTasks(): Promise<void> {
        if (!await this.isScheduleOn) {
            this.logger.serviceDebug('enableScheduleService is false');
        } else {
            try {
                const schedules = await this.scheduleSetupModel.readAll();
                schedules.forEach((item, index, array) => {
                    const task = {
                        pattern: 'create',
                        ...item
                    };
                    this.create(task);
                });
            } catch (err) {
                throw err;
            };
            this.logger.serviceDebug('now taskCount is');
            console.log(this.taskCount);
        };
    };

    splitExecuteTime(data: TaskExecuteDto): string | number {
        try {
            const { scheduleType, cycle, regular } = data;
            if (scheduleType === SCHEDULE_TYPE_CYCLE) {
                const cycleSplit = cycle.split('#')[1].split('/');
                const hour = Number(cycleSplit[0]) * 1000 * 60 * 60;
                const minute = Number(cycleSplit[1]) * 1000 * 60;
                return hour + minute;
            } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
                const regularSplit = regular.split('#')[1].split('/');
                const weekday = CRONWEEKDAY[regularSplit[0]];
                const hour = regularSplit[1];
                const minute = regularSplit[2];
                return `0 ${minute} ${hour} * * ${weekday}`;
            };
        } catch (err) {
            throw err;
        };
    };
};