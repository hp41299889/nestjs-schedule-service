//import packages
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpService {
    successResponse(): { results: string } {
        return { results: 'Success' };
    };
};