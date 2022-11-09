import { Module } from '@nestjs/common';
import { CloseConnectiionService } from './closeConnectiion.service';
import { ModuleInitService } from './moduleInit.service';

@Module({
    providers: [ModuleInitService, CloseConnectiionService],
    exports: [ModuleInitService, CloseConnectiionService]
})
export class ProcessModule { }