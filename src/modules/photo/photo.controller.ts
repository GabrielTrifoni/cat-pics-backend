import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { PhotoService } from "./photo.service";

@Controller('/photos')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
  ) {}

  @Get()
  async findAll() {
    return await this.photoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.photoService.findOne(id);
  }

  @Post()
  async create(@Body() input: CreatePhotoDto) {
    return await this.photoService.create(input);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() input: UpdatePhotoDto) {
    return await this.photoService.update(id, input);
  }
}
