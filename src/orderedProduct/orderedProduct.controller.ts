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
import OrderedProductService from './orderedProduct.service';
import UpdateOrderedProductDto from './dto/updateOrderProduct.dto';
import CreateOrderedProductDto from './dto/createorderedProduct.dto';
import FindOneParams from '../utils/findOneParams';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('orderedProduct')
@UseInterceptors(ClassSerializerInterceptor)
export default class OrderProductController {
  constructor(private readonly orderedProductService: OrderedProductService) {}
  
  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getOrderedProductById(@Param() { id }: FindOneParams) {
    return this.orderedProductService.getOrderedProductById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createOrderedProduct(@Body() orderedProduct: CreateOrderedProductDto) {
    return this.orderedProductService.createOrderedProduct(orderedProduct);
  }
  
  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteOrderById(@Param() { id }: FindOneParams) {
    return this.orderedProductService.deleteOrderedProduct(Number(id));
  }

}
