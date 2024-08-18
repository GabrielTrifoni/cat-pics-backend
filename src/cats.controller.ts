import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Cat } from './cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';

@Controller('/cats')
export class CatsController {
  constructor(
    @InjectRepository(Cat)
    private readonly repository: Repository<Cat>,
  ) {}

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
    const cat = await this.repository.findOneBy({ id });

    return await this.repository.save({
      ...cat,
      ...input,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const cat = await this.repository.findOneBy({ id });
    this.repository.delete(cat);
  }
}
