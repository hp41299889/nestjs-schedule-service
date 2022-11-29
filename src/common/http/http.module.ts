//import packages
import { Module } from '@nestjs/common';

//import services
import { HttpService } from './http.service';

@Module({
    exports: [HttpService],
    providers: [HttpService]
})
export class HttpModule { };