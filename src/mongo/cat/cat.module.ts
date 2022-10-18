import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Cat.name,
      schema: CatSchema
    }])
  ],
  providers: [CatService],
  exports: [CatService]
})
export class CatModule { }
