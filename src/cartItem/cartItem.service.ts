import { Injectable } from '@nestjs/common';
import CreateCartItemDto from './dto/createCartItem.dto';
import CartItem from './cartItem.entity';
import UpdateCarItemtDto from './dto/updateCartItem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,MoreThan } from 'typeorm';
import CartService from '../cart/cart.service';
import OrderService from '../order/order.service';
import OrderedProductService from '../orderedProduct/orderedProduct.service';
import CartItemNotFoundException from './exceptions/cartItemNotFound.exception';


@Injectable()
export default class CartItemService {

  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private cartService: CartService,
    private orderService: OrderService,
    private orderedProductService: OrderedProductService,
  ) {}

  async getCartItemById(id: number): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: {
        id,
        totalQuantity:MoreThan(0)
      },
      relations: {
        product: true,
        store:true
      },
    });
    if (cartItem) {
      return cartItem;
    }
    throw new CartItemNotFoundException(id);
  }

  async createCartItem(cartItem: CreateCartItemDto) {
    const newCartItrm = this.cartItemRepository.create(cartItem);
    await this.cartItemRepository.save(newCartItrm);
    return newCartItrm;
  }

  async createOrderFromCartItems(userId:number,cartItems: number[]) {
    let order= await this.orderService.createOrder({status: 0,userId: userId});
    let totalQuantity=0;
    let totalAmount=0;
    for (let index = 0; index < cartItems.length; index++) {
        let cartItem=await this.cartItemRepository.findOne({where:{id:cartItems[index]}});
        totalQuantity+=cartItem.totalQuantity;
        totalAmount+=cartItem.totalAmount;
        await this.orderedProductService.createOrderedProduct({totalAmount:cartItem.totalAmount,
          totalQuantity:cartItem.totalQuantity,productId:cartItem.productId,storeId:cartItem.storeId});
        await this.deleteCartItemById(cartItems[index]);  
      
    }
    await this.orderService.updateOrder(order.id,{status:0, totalQuantity:totalQuantity,totalAmount:totalAmount});
    return true;
  }

  async updateCartItem(id: number,cartItem: UpdateCarItemtDto): Promise<CartItem> {
    await this.cartItemRepository.update(id, cartItem);
    const updatedCart = await this.cartItemRepository.findOne({
      where: {
        id,
      },
      relations: {
        product: true,
        store:true,
      },
    });
    if (updatedCart) {
      return updatedCart;
    }
    throw new CartItemNotFoundException(id);
  }

  async deleteCartItemById(id: number): Promise<void> {
    return this.deleteCartItem(id);
  }

  async deleteCartItem(id: number): Promise<void> {
    const deleteResponse = await this.cartItemRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CartItemNotFoundException(id);
    }
    
  }
  
}
function missingNumber(nums: number[]): number {

  nums.sort((a:number,b:number)=>a-b);

  for (let index = 0; index < nums.length; index++) {
      if (index!==nums[index]) {
        return index;
      }
  }
  if (nums.length!==nums.length[nums.length-1]) {
    return nums.length
  }
  return -1;
};