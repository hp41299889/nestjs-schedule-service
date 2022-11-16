import { Injectable } from "@nestjs/common";

@Injectable()
export class TimeHelperService {
    async getWeekScope(data: Date) {
        const first = data.getDate() - data.getDay() + 1;
        const last = first + 6;
        const monday = new Date(data.setDate(first));
        const sunday = new Date(data.setDate(last));
        const start = new Date(monday.setHours(0, 0, 0, 0));
        const end = new Date(sunday.setHours(23, 59, 59, 999));
        const scope = {
            start: start,
            end: end
        };
        return scope;
    };
};