import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CatPhoto } from './cat-photo.entity';

@Entity('cat')
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => CatPhoto, (catPhoto) => catPhoto.cat)
    photos: CatPhoto[];
}