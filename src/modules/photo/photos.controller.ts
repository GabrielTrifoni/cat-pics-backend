import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Photo } from "../../entities/photo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";

@Controller('/photos')
export class PhotosController {
    constructor(
        @InjectRepository(Photo)
        private readonly repository: Repository<Photo>,
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
    async create(@Body() input: CreatePhotoDto) {
      return await this.repository.save({
        ...input,
      });
    }
  
    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdatePhotoDto) {
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
