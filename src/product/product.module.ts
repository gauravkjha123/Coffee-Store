import { Module } from '@nestjs/common';
import Post from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LocalFilesModule } from '../localFiles/localFiles.module';
import ProductController from './product.controller';
import ProductService from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), ConfigModule, LocalFilesModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}
