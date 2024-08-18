import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { Cat } from './cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'cat-pics',
      entities: [Cat],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Cat]),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
