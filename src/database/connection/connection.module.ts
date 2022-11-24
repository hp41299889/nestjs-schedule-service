//import packages
import { Module } from '@nestjs/common';

//import modules
import { LoggerModule } from 'src/common/logger/logger.module';
//import services
import { ConnectionService } from './connection.service';

@Module({
    imports: [LoggerModule],
    providers: [ConnectionService],
    exports: [ConnectionService]
})
export class ConnectionModule { }