import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CreateScheduleDto, ReadScheduleDto, UpdateScheduleDto } from 'src/provider/schedule/schedule.dto';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleModelService {
    constructor(
        @InjectDataSource('postgresConnection')
        private readonly dataSource: DataSource
    ) { };

    private readonly logger = new Logger(ScheduleModelService.name);

    create(data: CreateScheduleDto): void {
        const { commandSource, scheduleName, scheduleType, regular, cycle, MQCLI } = data;
        const schedule = new Schedule();
        schedule.createDatetime = new Date();
        schedule.lastEditDatetime = new Date();
        schedule.commandSource = commandSource;
        schedule.scheduleName = scheduleName;
        schedule.scheduleType = scheduleType;
        schedule.regular = regular;
        schedule.cycle = cycle;
        schedule.MQCLI = MQCLI;
        this.logger.debug('Saving schedule in postgres', { schedule });
        try {
            this.dataSource.manager.save(schedule)
                .then(() => {
                    this.logger.debug('Schedule create success', { schedule });
                });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async readAll(): Promise<Schedule[]> {
        this.logger.debug('Reading all schedule in postgres');
        try {
            return await this.dataSource.manager.find(Schedule);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async read(data: ReadScheduleDto): Promise<Schedule> {
        const { scheduleID } = data;
        const schedule = new Schedule();
        schedule.scheduleID = scheduleID;
        this.logger.debug('Reading row of scheduleID:', data);
        try {
            return await this.dataSource.manager.findOneBy(Schedule, { scheduleID: scheduleID });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async update(data: UpdateScheduleDto): Promise<void> {
        const { scheduleID, commandSource, scheduleName, scheduleType, regular, cycle, MQCLI } = data;
        const schedule = new Schedule();
        schedule.scheduleID = scheduleID;
        this.logger.debug('Updating a schedule in postgres', data);
        try {
            const target = await this.dataSource.manager.findOneBy(Schedule, { scheduleID: scheduleID });
            target.createDatetime = target.createDatetime;
            target.lastEditDatetime = new Date();
            target.commandSource = commandSource;
            target.scheduleName = scheduleName;
            target.scheduleType = scheduleType;
            target.regular = regular;
            target.cycle = cycle;
            target.MQCLI = MQCLI;
            this.dataSource.manager.save(target)
                .then(() => {
                    this.logger.debug('Update Success', { target });
                });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: Schedule): Promise<void> {
        this.logger.debug('Deleting a schedule in postgres', { data });
        try {
            this.dataSource.manager.remove(data)
                .then(() => {
                    this.logger.debug('Delete Success', { data });
                });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };
};