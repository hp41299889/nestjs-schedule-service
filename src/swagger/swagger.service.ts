import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

@Injectable()
export class SwaggerService {
    setupSwagger(app: NestExpressApplication): void {
        const builder = new DocumentBuilder();
        const config = builder
            .setTitle('BA220904')
            .setDescription('This is API document for BA220904 SecheduleService')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        const options: SwaggerCustomOptions = {
            explorer: true,
        };
        SwaggerModule.setup('swagger', app, document, options);
    };
};