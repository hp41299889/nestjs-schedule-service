import { Module } from "@nestjs/common";
import { TimeHelperService } from "./timeHelper.service";

@Module({
    providers: [TimeHelperService],
    exports: [TimeHelperService]
})
export class TimeHelperModule { };