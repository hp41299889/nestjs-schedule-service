//import packages
import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

//import constants
import { SERVICE } from './swagger.constants';

const {
    TITLE,      //title
    DESCRIBE,   //describe
    VERSION,    //version
    ROUTES      //routes
} = SERVICE;

@Injectable()
export class SwaggerService {
    setupSwagger(app: NestExpressApplication): void {
        const builder = new DocumentBuilder();
        const config = builder
            .setTitle(TITLE)
            .setDescription(DESCRIBE)
            .setVersion(VERSION)
            .build();
        const document = SwaggerModule.createDocument(app, config);
        const options: SwaggerCustomOptions = {
            explorer: true,
        };
        SwaggerModule.setup(ROUTES, app, document, options);
    };
};