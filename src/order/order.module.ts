import { Module } from '@nestjs/common';
import OrderController from './order.controller';
import OrderService from './order.service';
import Order from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule {}
