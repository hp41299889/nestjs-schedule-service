//import packages
import { Module } from '@nestjs/common';

//import modules
import { LoggerModule } from 'src/common/logger/logger.module';
//import services
import { JsonService } from './json.service';

@Module({
    imports: [LoggerModule],
    providers: [JsonService],
    exports: [JsonService]
})
export class JsonModule { };