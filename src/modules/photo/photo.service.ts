import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Photo } from "../../entities/photo.entity";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { Cat } from "src/entities/cat.entity";
import { CatPhoto } from "src/entities/cat-photo.entity";

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(CatPhoto)
    private readonly catPhotoRepository: Repository<CatPhoto>,
  ) { }

  public async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find({
      relations: ['cats', 'cats.photo'],
    });
  }

  public async findOne(id: number): Promise<Photo> {
    return await this.photoRepository.findOne({
      where: {id},
      relations: ['cats', 'cats.photo'],
    });
  }

  public async create(input: CreatePhotoDto): Promise<Photo> {
    const cats = await this.catRepository.findBy({ id: In(input.catsIds) });

    const photo = await this.photoRepository.save({ url: input.url });

    for (const cat of cats) {
      await this.catPhotoRepository.save({
        catId: cat.id,
        photoId: photo.id,
      });
    }

    return this.photoRepository.findOne({
      where: { id: photo.id },
      relations: ['cats'],
    });
  }

  public async update(id: number, input: UpdatePhotoDto): Promise<Photo> {
    const data = await this.photoRepository.findOneBy({ id });
    return await this.photoRepository.save({
      ...data,
      ...input,
    });
  }
}
