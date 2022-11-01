import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { Cat, CatSchema } from './cat.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
    controllers: [CatController],
    providers: [CatService],
})
export class CatModule { }