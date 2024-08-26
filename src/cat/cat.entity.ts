import { Photo } from "src/photo/photo.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Photo, (photo) => photo.cats)
    @JoinTable({
        name: 'cat_photo',
        joinColumn: { name: 'cat_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'photo_id', referencedColumnName: 'id' },
    })
    photos: Photo[];
}