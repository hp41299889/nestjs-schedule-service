import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [HttpModule, LoggerModule],
    exports: [HttpModule, LoggerModule]
})
export class CommonModule { };