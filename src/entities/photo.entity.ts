import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CatPhoto } from './cat-photo.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @OneToMany(() => CatPhoto, (catPhoto) => catPhoto.photo)
  cats: CatPhoto[];
}