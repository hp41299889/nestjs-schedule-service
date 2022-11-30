//import packages
import { Module } from '@nestjs/common';

//import modules
import { BossQueueModule } from './bossQueue/bossQueue.module';
import { JobQueueModule } from './jobQueue/jobQueue.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        BossQueueModule,
        JobQueueModule,
        TaskModule,
    ]
})
export class ProviderModule { }