import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  UseGuards,
} from '@nestjs/common';
import CreateCartItemDto from './dto/createCartItem.dto';
import UpdateCartDto from './dto/updateCartItem.dto';
import FindOneParams from '../utils/findOneParams';
import CartItemService from './cartItem.service';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import CreateOrderFromCartItemstDto from './dto/createOrderFromCartItems.dto';

@Controller('cartItem')
@UseInterceptors(ClassSerializerInterceptor)
export default class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getCartItemById(@Param() { id }: FindOneParams) {
    return this.cartItemService.getCartItemById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createCartItem(@Body() cartItem: CreateCartItemDto) {
    return this.cartItemService.createCartItem(cartItem);
  }

  @Post('/createOrderFromCartItems')
  @UseGuards(JwtAuthenticationGuard)
  async createOrderFromCartItems(@Body() body: CreateOrderFromCartItemstDto) {
    return this.cartItemService.createOrderFromCartItems(body.userId,body.carTItems);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateCartItem(
    @Param() { id }: FindOneParams,
    @Body() category: UpdateCartDto,
  ) {
    return this.cartItemService.updateCartItem(Number(id), category);
  }

}
