import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { ScheduleExecutionLogDto } from "src/provider/executionLog/executionLog.dto";

@Entity()
export class ScheduleExecutionLog {
    @PrimaryGeneratedColumn()
    scheduleID: number;

    @Column()
    scheduleType: string;

    @Column()
    schedule: string;

    @Column({ type: "jsonb" })
    weakLog: ScheduleExecutionLogDto[];
};