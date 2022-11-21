//import packages
import { Module } from '@nestjs/common';

//import modules
import { LoggerModule } from 'src/common/logger/logger.module';
//import controllers
import { RoutesController } from './routes.controller';

@Module({
    imports: [LoggerModule],
    controllers: [RoutesController]
})
export class RoutesModule { }
