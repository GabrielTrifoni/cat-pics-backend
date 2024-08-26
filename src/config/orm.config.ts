import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cat } from 'src/cat/cat.entity';
import { Photo } from 'src/photo/photo.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Cat, Photo],
    synchronize: true,
  }),
);