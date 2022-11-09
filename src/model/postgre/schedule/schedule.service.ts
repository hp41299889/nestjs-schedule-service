import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { CreateScheduleDto, DeleteScheduleDto, UpdateScheduleDto } from 'src/provider/schedule/schedule.dto';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleModelService {
    constructor(
        @InjectDataSource('postgresConnection')
        private readonly dataSource: DataSource
    ) { };

    private readonly logger = new Logger(ScheduleModelService.name);

    create(data: CreateScheduleDto) {
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
        try {
            this.logger.debug('Saving schedule in postgres', { schedule });
            return this.dataSource.manager.save(schedule);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    readAll() {
        try {
            this.logger.debug('Reading all schedule in postgres');
            return this.dataSource.manager.find(Schedule);
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async update(data: UpdateScheduleDto) {
        const { scheduleID, commandSource, scheduleName, schduleType, regular, cycle, MQCLI } = data;
        const schedule = new Schedule();
        schedule.scheduleID = scheduleID;
        try {
            this.logger.debug('Updating a schedule in postgres', data);
            const target = await this.dataSource.manager.findOneBy(Schedule, { scheduleID: scheduleID });
            target.createDatetime = target.createDatetime;
            target.lastEditDatetime = new Date();
            target.commandSource = commandSource;
            target.scheduleName = scheduleName;
            target.scheduleType = schduleType;
            target.regular = regular;
            target.cycle = cycle;
            target.MQCLI = MQCLI;
            return this.dataSource.manager.save(target).then(() => {
                this.logger.debug('Update Success', { target });
            });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: DeleteScheduleDto) {
        const { scheduleID } = data;
        const schedule = new Schedule();
        schedule.scheduleID = scheduleID;
        try {
            this.logger.debug('Deleting a schedule in postgres', scheduleID);
            const target = await this.dataSource.manager.findOneBy(Schedule, { scheduleID: scheduleID });
            return this.dataSource.manager.remove(target).then(() => {
                this.logger.debug('Delete Success', { target });
            });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };
};