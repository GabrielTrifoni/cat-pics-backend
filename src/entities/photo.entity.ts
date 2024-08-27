import { Cat } from 'src/entities/cat.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToMany(() => Cat, (cat) => cat.photos)
  cats: Cat[];
}
