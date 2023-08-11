import { Module } from '@nestjs/common';
import OrderProductController from './orderedProduct.controller';
import OrderedProductService from './orderedProduct.service';
import OrderedProduct from './orderedProduct.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderedProduct]),
    ConfigModule,
  ],
  controllers: [OrderProductController],
  providers: [OrderedProductService],
  exports:[OrderedProductService]
})
export class OrderedProductModule {}
