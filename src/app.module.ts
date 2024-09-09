import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './modules/cat/cat.controller';
import ormConfig from './config/orm.config';
import { ConfigModule } from '@nestjs/config';
import { Cat } from './entities/cat.entity';
import { PhotoController } from './modules/photo/photo.controller';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './modules/photo/photo.service';

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
  controllers: [CatsController, PhotoController],
  providers: [PhotoService],
})
export class AppModule { }
