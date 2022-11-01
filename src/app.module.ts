import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppConfigModule } from './config/app.config.module';
import { SwaggerModule } from './swagger/swagger.module';
import { TaskModule } from './provider/task/task.module';
import { DatabaseModule } from './database/database.module';
import { MathModule } from './common/math/math.module';

@Module({
  imports: [
    AppConfigModule,
    SwaggerModule,
    ScheduleModule.forRoot(),
    TaskModule,
    DatabaseModule,
    MathModule
  ]
})
export class AppModule { }