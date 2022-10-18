import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './cat.schema';
import { CreateCatDto } from './cat.dto';

@Injectable()
export class CatService {
    constructor(
        @InjectModel(Cat.name) private catModel: Model<CatDocument>
    ) { }

    async create(createCatDto: CreateCatDto): Promise<any> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    };

    async findAll(): Promise<any> {
        return this.catModel.find().exec();
    };
};