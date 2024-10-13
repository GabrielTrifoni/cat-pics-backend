import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CatPhoto } from 'src/entities/cat-photo.entity';
import { Cat } from 'src/entities/cat.entity';
import { Photo } from 'src/entities/photo.entity';
import { User } from 'src/entities/user.entity';

export default registerAs( 
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Cat, Photo, CatPhoto, User],
    synchronize: true,
  }),
);