import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Photo } from "../../entities/photo.entity";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly repository: Repository<Photo>,
  ) {}

  public async findAll(): Promise<Photo[]> {
    return await this.repository.find();
  }

  public async findOne(id: number): Promise<Photo> {
    return await this.repository.findOneBy({ id });
  }

  public async create(input: CreatePhotoDto): Promise<Photo> {
    return await this.repository.save({
      ...input,
    });
  }

  public async update(id: number, input: UpdatePhotoDto): Promise<Photo> {
    const data = await this.repository.findOneBy({ id });
    return await this.repository.save({
      ...data,
      ...input,
    });
  }

  public async delete(id: number): Promise<void> {
    const data = await this.repository.findOneBy({ id });
    if (data) {
      await this.repository.delete(data);
    }
  }
}
