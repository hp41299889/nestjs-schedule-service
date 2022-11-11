import { Module } from '@nestjs/common';

import { SetupService } from './setup.service';
import { SetupController } from './setup.controller';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [SetupService],
  controllers: [SetupController]
})
export class SetupModule { }
