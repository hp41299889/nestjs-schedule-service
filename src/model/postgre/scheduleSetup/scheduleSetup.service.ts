import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateScheduleDto, ReadScheduleDto, UpdateScheduleDto } from 'src/provider/schedule/schedule.dto';
import { ScheduleSetup } from './scheduleSetup.entity';
import { SERVICE } from './scheduleSetup.constants';

const {
    DATASOURCE_CONNECTION,  //
    DEBUG_CREATE,           //
    DEBUG_CREATE_SUCCESS,   //
    DEBUG_DELETE,           //
    DEBUG_DELETE_SUCCESS,   //
    DEBUG_READ,             //
    DEBUG_READALL,          //
    DEBUG_READALL_SUCCESS,  //
    DEBUG_READ_SUCCESS,     //
    DEBUG_UPDATE,           //
    DEBUG_UPDATE_SUCCESS,   //
} = SERVICE;

@Injectable()
export class ScheduleSetupModelService {
    constructor(
        @InjectRepository(ScheduleSetup)
        private readonly scheduleSetupRepository: Repository<ScheduleSetup>
    ) { };

    private readonly logger = new Logger(ScheduleSetupModelService.name);

    async create(data: CreateScheduleDto): Promise<void> {
        const { commandSource, scheduleName, scheduleType, regular, cycle, MQCLI } = data;
        const schedule = new ScheduleSetup();
        schedule.createDatetime = new Date();
        schedule.lastEditDatetime = new Date();
        schedule.commandSource = commandSource;
        schedule.scheduleName = scheduleName;
        schedule.scheduleType = scheduleType;
        schedule.regular = regular;
        schedule.cycle = cycle;
        schedule.MQCLI = MQCLI;
        this.logger.debug(DEBUG_CREATE, { schedule });
        try {
            await this.scheduleSetupRepository.save(schedule);
            this.logger.debug(DEBUG_CREATE_SUCCESS, { schedule });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async readAll(): Promise<ScheduleSetup[]> {
        this.logger.debug(DEBUG_READALL);
        try {
            const rows = await this.scheduleSetupRepository.find();
            this.logger.debug(DEBUG_READALL_SUCCESS, { rows });
            return rows;
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async read(data: ReadScheduleDto): Promise<ScheduleSetup> {
        const { scheduleID } = data;
        const schedule = new ScheduleSetup();
        schedule.scheduleID = scheduleID;
        this.logger.debug(DEBUG_READ, data);
        try {
            const row = await this.scheduleSetupRepository.findOneBy({ scheduleID });
            this.logger.debug(DEBUG_READ_SUCCESS, { row });
            return row;
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async update(data: UpdateScheduleDto): Promise<void> {
        const { scheduleID, commandSource, scheduleName, scheduleType, regular, cycle, MQCLI } = data;
        const schedule = new ScheduleSetup();
        schedule.scheduleID = scheduleID;
        this.logger.debug(DEBUG_UPDATE, data);
        try {
            const target = await this.scheduleSetupRepository.findOneBy({ scheduleID });
            target.createDatetime = target.createDatetime;
            target.lastEditDatetime = new Date();
            target.commandSource = commandSource;
            target.scheduleName = scheduleName;
            target.scheduleType = scheduleType;
            target.regular = regular;
            target.cycle = cycle;
            target.MQCLI = MQCLI;
            await this.scheduleSetupRepository.save(target);
            this.logger.debug(DEBUG_UPDATE_SUCCESS, { target });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };

    async delete(data: ScheduleSetup): Promise<void> {
        this.logger.debug(DEBUG_DELETE, { data });
        try {
            await this.scheduleSetupRepository.remove(data);
            this.logger.debug(DEBUG_DELETE_SUCCESS, { data });
        } catch (err) {
            this.logger.error(err);
            return err;
        };
    };
};