import { Injectable } from '@nestjs/common';
import CreateOrderedProductDto from './dto/createorderedProduct.dto';
import OrderedProduct from './orderedProduct.entity';
import UpdateOrderedProductDto from './dto/updateOrderProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import OrderedProductNotFoundException from './exceptions/orderedProductNotFound.exception';

@Injectable()
export default class OrderedProductService {


  constructor(
    @InjectRepository(OrderedProduct)
    private OrderedProductRepository: Repository<OrderedProduct>,
  ) {}

  async getOrderedProductById(id: number): Promise<OrderedProduct> {
    const orderedProduct=await this.OrderedProductRepository.createQueryBuilder('OrderedProduct')
    .where('OrderedProduct.id=:id',{id:id})
    .leftJoinAndSelect('OrderedProduct.product','u')
    .getOne();
    if (orderedProduct) {
      return orderedProduct;
    }
    throw new OrderedProductNotFoundException(id);
  }


  async createOrderedProduct(order: CreateOrderedProductDto) {
    const newOrder = await this.OrderedProductRepository.create(order);
    await this.OrderedProductRepository.save(newOrder);
    return newOrder;
  }

  // async updateOrderedProduct(
  //   id: number,
  //   order: UpdateOrderedProductDto,
  // ): Promise<OrderedProduct> {
  //   await this.OrderedProductRepository.update(id, order);
  //   const updatedOrder = await this.OrderedProductRepository.findOne({
  //     where: {
  //       id,
  //     },
  //     relations: {
  //       product: true,
  //     },
  //   });
  //   if (updatedOrder) {
  //     return updatedOrder;
  //   }
  //   throw new OrderedProductNotFoundException(id);
  // }

  async deleteOrderedProductById(id: number): Promise<void> {
    return this.deleteOrderedProduct(id);
  }

  async deleteOrderedProduct(id: number): Promise<any> {
    const deleteResponse = await this.OrderedProductRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new OrderedProductNotFoundException(id);
    }
    return deleteResponse;
  }
}
