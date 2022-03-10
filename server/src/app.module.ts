import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './apis/category/category.module';
import { User } from './entities/User';

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
  ],
})
export class AppModule {}
