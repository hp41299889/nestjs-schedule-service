import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCatDto, UpdateCatDto } from './cat.dto';
import { Cat, CatDocument } from './cat.schema';

@Injectable()
export class CatService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        return await new this.catModel(createCatDto).save();
    };

    async findAll(): Promise<Cat[]> {
        return await this.catModel.find().exec();
    };

    async findOne(id: string): Promise<Cat> {
        return await this.catModel
            .findOne({ _id: id })
            .exec();
    };

    async update(id: string, updateCatDto: UpdateCatDto) {
        return await this.catModel
            .findByIdAndUpdate({ _id: id }, updateCatDto)
            .setOptions({ overwrite: true, new: true });
    };

    async delete(id: string) {
        return await this.catModel
            .findByIdAndRemove({ _id: id })
            .exec();
    };
};