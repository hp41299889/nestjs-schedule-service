import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    scheduleName: string;

    @Column()
    scheduleType: string;

    @Column('text', { nullable: true, array: true })
    regular: string[];

    @Column('text', { nullable: true, array: true })
    cycle: string[];

    @Column()
    MQCLI: string;
};