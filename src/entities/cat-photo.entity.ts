import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Cat } from './cat.entity';
import { Photo } from './photo.entity';

@Entity('cat_photo')
export class CatPhoto {
  @PrimaryColumn()
  catId: number;

  @PrimaryColumn()
  photoId: number;

  @ManyToOne(() => Cat, (cat) => cat.photos)
  cat: Cat;

  @ManyToOne(() => Photo, (photo) => photo.cats)
  photo: Photo;
}
