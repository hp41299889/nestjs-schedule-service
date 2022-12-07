//import packages
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

//import constants
import { SERVICE, CRONWEEKDAY } from './task.constants';
import { TASK } from './task.constants';
//import dtos
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto, TaskExecuteDto, BuildWeekTasksTimeDto } from './task.dto';
//import models
import { CreateScheduleExecutionLogDto } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.dto';
import { ScheduleExecutionLogModel } from 'src/model/mongo/ScheduleExecutionLog/scheduleExecutionLog.service';
import { ScheduleSetupModel } from 'src/model/postgre/scheduleSetup/scheduleSetup.service';
//import services
import { JobQueueService } from '../jobQueue/jobQueue.service';
import { LoggerService } from 'src/common/logger/logger.service';
import { JsonService } from 'src/config/json/json.service';
import { TimeHelperService } from 'src/util/time/timeHelper.service';

const {
    CREATE_METHOD,          //create()
    UPDATE_METHOD,          //update()
    DELETE_METHOD,          //delete()
    SCHEDULE_TYPE_CYCLE,    //cycle
    SCHEDULE_TYPE_REGULAR,  //regular
    TASK_MESSAGE_CYCLE,     //Message when cycle task execute
    TASK_MESSAGE_REGULAR,   //Message when regular task execute
} = SERVICE;

const {
    OK,                     //
    WAITING,                //
    ERROR,                  //
} = TASK;

@Injectable()
export class TaskService {
    constructor(
        private readonly logger: LoggerService,
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly jobQueueService: JobQueueService,
        private readonly scheduleExecutionLogModel: ScheduleExecutionLogModel,
        private readonly scheduleSetupModel: ScheduleSetupModel,
        private readonly jsonService: JsonService,
        private readonly timeHelperService: TimeHelperService
    ) {
        this.logger.setContext(TaskService.name);
    };

    private readonly isScheduleOn = this.jsonService.read('enableScheduleService');
    private readonly timeFix = new Date().getTimezoneOffset();
    private readonly taskCount = { interval: 0, cronJob: 0 };
    private taskBornTime = {};


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
                        const task = async () => {
                            this.logger.warn(`${TASK_MESSAGE_CYCLE} ${scheduleName}`);
                            this.logger.warn({ data });
                            const messageObserver = await this.jobQueueService.sendMessage(MQCLI);
                            const createdLog: CreateScheduleExecutionLogDto = {
                                ...data,
                                scheduleID: scheduleID,
                                schedule: item,
                                processDatetime: new Date(),
                            };
                            messageObserver.subscribe({
                                next: x => {
                                    createdLog.processStatus = OK;
                                    this.scheduleExecutionLogModel.create(createdLog);
                                },
                                error: e => {
                                    createdLog.processStatus = ERROR;
                                    this.scheduleExecutionLogModel.create(createdLog);
                                }
                            });
                        };
                        const interval = setInterval(task, executeTime);
                        const taskName = `${scheduleName}_${item}`;
                        this.taskBornTime[scheduleName] = new Date();
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
                        const task = new CronJob(executeTime, async () => {
                            this.logger.warn(`${TASK_MESSAGE_REGULAR} ${scheduleName}`);
                            this.logger.warn({ data });
                            const messageObserver = await this.jobQueueService.sendMessage(MQCLI);
                            const createdLog: CreateScheduleExecutionLogDto = {
                                ...data,
                                scheduleID: scheduleID,
                                schedule: item,
                                processDatetime: new Date(),
                            };
                            messageObserver.subscribe({
                                next: x => {
                                    console.log(x);
                                    createdLog.processStatus = OK;
                                    this.scheduleExecutionLogModel.create(createdLog);
                                },
                                error: e => {
                                    console.log(e);
                                    createdLog.processStatus = ERROR;
                                    this.scheduleExecutionLogModel.create(createdLog);
                                },
                            })
                        });
                        const taskName = `${scheduleName}_${item}`;
                        this.taskBornTime[scheduleName] = new Date();
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
                delete this.taskBornTime[scheduleName];
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
                    this.create(item);
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
                const hour = Number(regularSplit[1]) - this.timeFix / 60 - 8;
                const minute = regularSplit[2] + this.timeFix % 60;
                const weekdayIndex = Number(regularSplit[0]);
                if (hour > 24) {
                    const weekdayIndexFix = weekdayIndex + 1;
                    const hourFix = hour - 24;
                    if (weekdayIndexFix < 0) {
                        const weekday = CRONWEEKDAY[7];
                        return `0 ${minute} ${hourFix} * * ${weekday}`;
                    } else {
                        const weekday = CRONWEEKDAY[weekdayIndex]
                        return `0 ${minute} ${hourFix} * * ${weekday}`;
                    };
                } else {
                    const weekday = CRONWEEKDAY[weekdayIndex]
                    return `0 ${minute} ${hour} * * ${weekday}`;
                };
            };
        } catch (err) {
            throw err;
        };
    };

    async buildWeekWaitingTasksTime(data: BuildWeekTasksTimeDto): Promise<Array<any>> {
        //TS -> time stamp
        //Time -> Date object
        this.logger.serviceDebug('build');
        const nowTime = new Date();
        const executeTimes = [];
        const { scheduleName, scheduleType, cycle, regular } = data;
        if (scheduleType === SCHEDULE_TYPE_CYCLE) {
            this.logger.serviceDebug('cycle');
            cycle.forEach(item => {
                const cycleTask = {
                    scheduleType: scheduleType,
                    cycle: item
                };
                const interval = Number(this.splitExecuteTime(cycleTask));
                const { end } = this.timeHelperService.getCurrentWeek(new Date());
                const startTS = this.taskBornTime[scheduleName].getTime();
                const endTS = end.getTime();
                let times = 1;
                while ((startTS + interval * times) <= endTS) {
                    const nextTime = new Date(startTS + interval * times++);
                    if (nextTime >= nowTime) {
                        executeTimes.push({ time: nextTime, schedule: item });
                    };
                };
            });
        } else if (scheduleType === SCHEDULE_TYPE_REGULAR) {
            this.logger.serviceDebug('regular');
            const { end } = this.timeHelperService.getCurrentWeek(new Date());
            const endTS = end.getTime();
            regular.forEach(item => {
                const cronJobName = `${scheduleName}_${item}`;
                const nextTime = new Date(this.schedulerRegistry.getCronJob(cronJobName).nextDate()['ts']);
                const nextTS = nextTime.getTime();
                const nextTimeFix = new Date(nextTS);
                const nextTSFix = nextTimeFix.getTime();
                if (nextTSFix <= endTS) {
                    executeTimes.push({ time: nextTimeFix, schedule: item });
                };
            });
        };
        return executeTimes;
    };
};