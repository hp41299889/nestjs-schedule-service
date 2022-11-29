//import packages
import { Injectable } from "@nestjs/common";

//import dtos
import { TimePeriodDto } from "./timeHelper.dto";

@Injectable()
export class TimeHelperService {

    getCurrentWeek(data: Date): TimePeriodDto {
        const now = new Date();
        const startDate = new Date(data.setDate(data.getDate() - data.getDay() + 1));
        const start = new Date(startDate.setHours(0, 0, 0, 0));
        const endDate = new Date(now.setDate(7 - now.getDay() + now.getDate()));
        const end = new Date(endDate.setHours(23, 59, 59, 999));
        const period = {
            start: start,
            end: end
        };
        return period;
    };

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
        return period;
    };
};