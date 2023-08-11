import { Module } from '@nestjs/common';
import CategoriesController from './categories.controller';
import CategoriesService from './categories.service';
import Category from './category.entity';
import { LocalFilesModule } from '../localFiles/localFiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    LocalFilesModule,
    ConfigModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
