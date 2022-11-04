import { Module } from '@nestjs/common';
// import { ScheduleModule } from '@nestjs/schedule';

import { ConfigModule } from './config/config.module';
import { SwaggerModule } from './swagger/swagger.module';
// import { TaskModule } from './provider/task/task.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from './provider/schedule/schedule.module';
import { AppController } from './app.controller';
import { SetupModule } from './provider/setup/setup.module';
import { MonitorModule } from './provider/monitor/monitor.module';
import { ExecutionLogModule } from './provider/executionLog/executionLog.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [
    ConfigModule,
    SwaggerModule,
    ProviderModule
    // ScheduleModule.forRoot(),
    // TaskModule,
    // DatabaseModule,
  ],
  controllers: [AppController]
})
export class AppModule { }