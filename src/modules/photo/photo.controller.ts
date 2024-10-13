import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { PhotoService } from "./photo.service";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";

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
  @UseGuards(AuthGuardJwt)
  async create(@Body() input: CreatePhotoDto) {
    return await this.photoService.create(input);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  async update(@Param('id') id: number, @Body() input: UpdatePhotoDto) {
    return await this.photoService.update(id, input);
  }
}
