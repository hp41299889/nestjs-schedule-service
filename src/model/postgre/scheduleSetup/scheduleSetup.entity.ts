//import packages
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { JsonrpcMessageDto } from "src/provider/jobQueue/jobQueue.dto";

@Entity()
export class ScheduleSetup {
    @PrimaryGeneratedColumn()
    scheduleID: number;

    @Column('timestamptz')
    createDatetime: Date;

    @Column('timestamptz')
    lastEditDatetime: Date;

    @Column()
    commandSource: string;

    @Column({ unique: true })
    scheduleName: string;

    @Column()
    scheduleType: string;

    @Column('text', { nullable: true, array: true })
    regular: string[];

    @Column('text', { nullable: true, array: true })
    cycle: string[];

    @Column({ type: 'jsonb' })
    MQCLI: JsonrpcMessageDto;
};