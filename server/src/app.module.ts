import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './apis/category/category.module';
import { ContentModule } from './apis/content/content.module';
import { UserModule } from './apis/user/user.module';
import { User } from './entities/User';
import CatchException from './error/CatchException';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'silverbeen',
      database: 'smail_db',
      entities: ['dist/entities/*.{ts,js}'], // Entity 연결
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    CategoryModule,
    ContentModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule {}
