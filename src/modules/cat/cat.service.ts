import { Body, Injectable, Param, ParseIntPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cat } from "src/entities/cat.entity";
import { Repository } from "typeorm";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(Cat)
        private readonly repository: Repository<Cat>,
    ) { }

    public async findAll() {
        return await this.repository.find({
            relations: ['photos', 'photos.cat'],
        });
    }

    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['photos', 'photos.cat'],
        });
    }

    public async create(@Body() input: CreateCatDto) {
        return await this.repository.save({
            ...input,
        });
    }

    public async update(@Param('id') id, @Body() input: UpdateCatDto) {
        const data = await this.repository.findOneBy({ id });

        return await this.repository.save({
            ...data,
            ...input,
        });
    }
}