import { ApiProperty } from '@nestjs/swagger';

export enum dateIntervalEnum {
    '前一日' = 'day',
    '前一週' = 'week',
    '前一月' = 'month',
    '前一年' = 'year'
};

export class QueryDto {
    @ApiProperty({ default: new Date().toLocaleDateString() })
    startDate: string;

    @ApiProperty({ enum: Object.keys(dateIntervalEnum) })
    dateInterval: dateIntervalEnum;
};