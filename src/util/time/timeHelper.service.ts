//import packages
import { Injectable } from "@nestjs/common";

//import dtos
import { TimePeriodDto } from "./timeHelper.dto";

@Injectable()
export class TimeHelperService {

    getDayPeriod(data: Date): TimePeriodDto {
        const now = new Date();
        const startDate = new Date(data.setDate(data.getDate() - 1));
        const time = {
            hours: now.getHours(),
            min: now.getMinutes(),
            sec: now.getSeconds(),
            ms: now.getMilliseconds()
        };
        const { hours, min, sec, ms } = time;
        const start = new Date(startDate.setHours(hours, min, sec, ms));
        const end = new Date();
        const period = {
            start: start,
            end: end
        };
        console.log(period);

        return period;
    };

    getWeekPeriod(data: Date): TimePeriodDto {
        const now = new Date();
        const startDate = new Date(data.setDate(data.getDate() - 6));
        const time = {
            hours: now.getHours(),
            min: now.getMinutes(),
            sec: now.getSeconds(),
            ms: now.getMilliseconds()
        };
        const { hours, min, sec, ms } = time;
        const start = new Date(startDate.setHours(hours, min, sec, ms));
        const end = new Date();
        const period = {
            start: start,
            end: end
        };
        console.log(period);

        return period;
    };

    getMonthPeriod(data: Date): TimePeriodDto {
        const now = new Date();
        const startDate = new Date(data.setDate(data.getDate() - 30));
        const time = {
            hours: now.getHours(),
            min: now.getMinutes(),
            sec: now.getSeconds(),
            ms: now.getMilliseconds()
        };
        const { hours, min, sec, ms } = time;
        const start = new Date(startDate.setHours(hours, min, sec, ms));
        const end = new Date();
        const period = {
            start: start,
            end: end
        };
        console.log(period);

        return period;
    };

    getYearPeriod(data: Date): TimePeriodDto {
        const now = new Date();
        const startDate = new Date(data.setDate(data.getDate() - 365));
        const time = {
            hours: now.getHours(),
            min: now.getMinutes(),
            sec: now.getSeconds(),
            ms: now.getMilliseconds()
        };
        const { hours, min, sec, ms } = time;
        const start = new Date(startDate.setHours(hours, min, sec, ms));
        const end = new Date();
        const period = {
            start: start,
            end: end
        };
        console.log(period);

        return period;
    };
};