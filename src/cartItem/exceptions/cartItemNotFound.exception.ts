import { NotFoundException } from '@nestjs/common';

class CartItemNotFoundException extends NotFoundException {
  constructor(cartItemId: number) {
    super(`CartItem with id ${cartItemId} not found`);
  }
}

export default CartItemNotFoundException;
