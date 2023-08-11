import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import OrderService from './order.service';
import UpdateOrderDto from './dto/updateOrder.dto';
import CreateOrderDto from './dto/createOrder.dto';
import FindOneParams from '../utils/findOneParams';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
export default class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getOrderById(@Param() { id }: FindOneParams) {
    return this.orderService.getOrderById(Number(id));
  }

  @Get('user/:id')
  @UseGuards(JwtAuthenticationGuard)
  getOrderByUserId(@Param() { id }: FindOneParams) {
    return this.orderService.getOrderByUserId(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createOrder(@Body() product: CreateOrderDto) {
    return this.orderService.createOrder(product);
  }
  
  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateOrder(
    @Param() { id }: FindOneParams,
    @Body() category: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(Number(id), category);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteOrderById(@Param() { id }: FindOneParams) {
    return this.orderService.deleteOrderById(Number(id));
  }

}
