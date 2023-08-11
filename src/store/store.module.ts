import { Module } from '@nestjs/common';
import Store from './store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LocalFilesModule } from '../localFiles/localFiles.module';
import { ProductModule } from '../product/product.module';
import StoreController from './store.controller';
import StoreService from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), ConfigModule, LocalFilesModule,ProductModule],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
