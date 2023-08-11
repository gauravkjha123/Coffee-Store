import { Injectable } from '@nestjs/common';
import CreateOrderDto from './dto/createOrder.dto';
import Order from './order.entity';
import UpdateOrderDto from './dto/updateOrder.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import OrderNotFoundException from './exceptions/orderNotFound.exception';

@Injectable()
export default class OrderService {


  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getOrderById(id: number): Promise<Order> {
    const order=await this.orderRepository.createQueryBuilder('Order')
    .where('Order.id=:id',{id:id})
    .leftJoinAndSelect('Order.user','u')
    .leftJoinAndSelect('Order.orderedProduct','o')
    .getOne();
    if (order) {
      return order;
    }
    throw new OrderNotFoundException(id);
  }

  async getOrderByUserId(userId: number): Promise<Order[]> {
    const order=await this.orderRepository.createQueryBuilder('Order')
    .where('Order.userId=:userId',{userId:userId})
    .leftJoinAndSelect('Order.orderedProduct','o')
    .getMany();
    if (order) {
      return order;
    }
    throw new OrderNotFoundException(userId);
  }

  async createOrder(order: CreateOrderDto) {
    order["orderDeliveryDate"]=new Date();
    const newOrder = await this.orderRepository.create(order);
    await this.orderRepository.save(newOrder);
    return newOrder;
  }

  async updateOrder(
    id: number,
    order: UpdateOrderDto,
  ): Promise<Order> {
    await this.orderRepository.update(id, order);
    const updatedOrder = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (updatedOrder) {
      return updatedOrder;
    }
    throw new OrderNotFoundException(id);
  }

  async deleteOrderById(id: number): Promise<void> {
    return this.deleteOrder(id);
  }

  async deleteOrder(id: number): Promise<any> {
    const deleteResponse = await this.orderRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new OrderNotFoundException(id);
    }
    return deleteResponse;
  }
  
}
