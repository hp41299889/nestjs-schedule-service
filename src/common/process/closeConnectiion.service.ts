import { Injectable, BeforeApplicationShutdown } from '@nestjs/common';

@Injectable()
export class CloseConnectiionService implements BeforeApplicationShutdown {
    beforeApplicationShutdown(signal?: string) {

    }
};