//import packages
import { Module } from '@nestjs/common';

//import modules
import { LoggerModule } from 'src/common/logger/logger.module';
//import controllers
import { RoutesController } from './routes.controller';
//import services
import { RoutesService } from './routes.service';

@Module({
    imports: [LoggerModule],
    providers: [RoutesService],
    controllers: [RoutesController]
})
export class RoutesModule { }
