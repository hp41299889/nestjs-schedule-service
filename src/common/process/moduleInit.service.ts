import { Injectable, OnModuleInit, } from '@nestjs/common';

@Injectable()
export class ModuleInitService implements OnModuleInit {
    onModuleInit() {
        console.log('Module has been init');

    }
};