//import packages
import { Module } from '@nestjs/common';

//import modules
import { HttpModule } from './http/http.module';
import { LoggerModule } from './logger/logger.module';
import { HealthModule } from './health/health.module';

@Module({
    imports: [HttpModule, LoggerModule, HealthModule],
    exports: [HttpModule, LoggerModule]
})
export class CommonModule { };