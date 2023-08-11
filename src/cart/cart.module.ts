import { Module } from '@nestjs/common';
import CartController from './cart.controller';
import CartService from './cart.service';
import Cart from './cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    ConfigModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports:[CartService]
})
export class CartModule {}
