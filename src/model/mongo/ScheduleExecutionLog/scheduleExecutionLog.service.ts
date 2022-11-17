//import packages
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

//import dtos
import { CreateScheduleExecutionLogDto, FindWeekDto, FindPeriodDto } from './scheduleExecutionLog.dto';
//import constants
import { SERVICE } from './scheduleExecutionLog.constants';
//import models
import { ScheduleExecutionLog, ScheduleExecutionLogDocument } from './scheduleExecutionLog.schema';
//import services
import { TimeHelperService } from 'src/util/time/timeHelper.service';

const {
    CONNECTION_NAME,    //
} = SERVICE;

@Injectable()
export class ScheduleExecutionLogService {
    constructor(
        @InjectModel(ScheduleExecutionLog.name, CONNECTION_NAME)
        private scheduleExecutionLogModel: Model<ScheduleExecutionLogDocument>,
        private readonly timeHelperService: TimeHelperService
    ) { };

    async create(createCatDto: CreateScheduleExecutionLogDto): Promise<ScheduleExecutionLog> {
        const createdLog = new this.scheduleExecutionLogModel(createCatDto);
        return createdLog.save();
    };

    async findWeek(data: number) {
        const now = new Date();
        const scope = await this.timeHelperService.getWeekScope(now);
        const { start, end } = scope;
        const executionLogs = this.scheduleExecutionLogModel
            .find({ scheduleID: data })
            .where('processDatetime').gt(Number(start)).lt(Number(end))
            .exec();
        return await executionLogs;
    };

    async findPeriod(data: FindPeriodDto): Promise<ScheduleExecutionLog[]> {
        const { start, end } = data;
        const documents = this.scheduleExecutionLogModel
            .find()
            .where('processDatetime').gt(Number(start)).lt(Number(end))
            .exec();
        return await documents;
    };

    async findAll(): Promise<ScheduleExecutionLog[]> {
        return this.scheduleExecutionLogModel.find().exec();
    };
};