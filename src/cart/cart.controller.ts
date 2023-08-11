import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
} from '@nestjs/common';
import CategoriesService from './cart.service';
import FindOneParams from '../utils/findOneParams';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('cart')
@UseInterceptors(ClassSerializerInterceptor)
export default class CartController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getCartById(@Param() { id }: FindOneParams) {
    return this.categoriesService.getCartById(Number(id));
  }


}
