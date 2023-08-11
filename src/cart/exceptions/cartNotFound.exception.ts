import { NotFoundException } from '@nestjs/common';

class CartNotFoundException extends NotFoundException {
  constructor(cartId: number) {
    super(`Cart with id ${cartId} not found`);
  }
}

export default CartNotFoundException;
