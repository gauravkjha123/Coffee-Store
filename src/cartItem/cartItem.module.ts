import { Module } from '@nestjs/common';
import CartItemController from './cartItem.controller';
import CartItemService from './cartItem.service';
import CartItem from './cartItem.entity';
import {CartModule} from '../cart/cart.module';
import {OrderModule} from '../order/order.module';
import {OrderedProductModule} from '../orderedProduct/orderedProduct.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem]),
    ConfigModule,
    CartModule,
    OrderModule,
    OrderedProductModule
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
