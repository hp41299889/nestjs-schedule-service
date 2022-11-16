//import packages
import { Module } from '@nestjs/common';

//import controllers
import { RoutesController } from './routes.controller';
//import services
import { RoutesService } from './routes.service';

@Module({
    providers: [RoutesService],
    controllers: [RoutesController]
})
export class RoutesModule { }
