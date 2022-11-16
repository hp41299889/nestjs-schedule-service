//import packages
import { Module } from '@nestjs/common';

//import services
import { JsonService } from './json.service';

@Module({
    providers: [JsonService],
    exports: [JsonService]
})
export class JsonModule { };