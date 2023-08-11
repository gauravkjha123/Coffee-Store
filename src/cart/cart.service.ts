import { Injectable } from '@nestjs/common';
import CreateCartDto from './dto/createCart.dto';
import Cart from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CartNotFoundException from './exceptions/cartNotFound.exception';

@Injectable()
export default class CartService {
  /**
   * @ignore
   */
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async getCartById(id: number): Promise<Cart> {
    const cart=await this.cartRepository.createQueryBuilder('cart')
    .where('cart.id=:id',{id:id})
    .leftJoinAndSelect('cart.cartItems','cartItems')
    .getOne();;
    if (cart) {
      return cart;
    }
    throw new CartNotFoundException(id);
  }

  async createCart(cart: CreateCartDto) {
    const newCart = await this.cartRepository.create(cart);
    await this.cartRepository.save(newCart);
    return newCart;
  }

  async deleteCartById(id: number): Promise<void> {
    return this.deleteCart(id);
  }

  async deleteCart(id: number): Promise<any> {
    const deleteResponse = await this.cartRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CartNotFoundException(id);
    }
    return deleteResponse;
  }
}
