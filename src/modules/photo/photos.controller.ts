import { Controller, Get } from "@nestjs/common";
import { Photo } from "../../entities/photo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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
}
