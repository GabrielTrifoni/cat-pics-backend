import { Body, Delete, Get, HttpCode, Injectable, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
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

    @Get()
    async findAll() {
        return await this.repository.find();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.repository.findOneBy({ id });
    }

    @Post()
    async create(@Body() input: CreateCatDto) {
        return await this.repository.save({
            ...input,
        });
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateCatDto) {
        const data = await this.repository.findOneBy({ id });

        return await this.repository.save({
            ...data,
            ...input,
        });
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: number) {
        const data = await this.repository.findOneBy({ id });
        this.repository.delete(data);
    }
}