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
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatService } from './cat.service';

@Controller('/cats')
export class CatsController {
  constructor(
    private readonly catService: CatService,
  ) {}

  async findAll() {
    return await this.catService.findAll();
  }

  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.catService.findOne(id);
  }

  async create(@Body() input: CreateCatDto) {
    return await this.catService.create(input);
  }

  async update(@Param('id') id: number, @Body() input: UpdateCatDto) {
    return await this.catService.update(id, input);
  }

  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.catService.delete(id);
  }  
}
