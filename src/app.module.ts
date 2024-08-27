import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './modules/cat/cats.controller';
import ormConfig from './config/orm.config';
import { ConfigModule } from '@nestjs/config';
import { Cat } from './entities/cat.entity';
import { PhotosController } from './modules/photo/photos.controller';
import { Photo } from './entities/photo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig
    }),
    TypeOrmModule.forFeature([Cat, Photo]),
  ],
  controllers: [CatsController, PhotosController],
  providers: [],
})
export class AppModule { }
