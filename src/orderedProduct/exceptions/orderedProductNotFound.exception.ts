import { NotFoundException } from '@nestjs/common';

class OrderedProductNotFoundException extends NotFoundException {
  constructor(OrderedProductId: number) {
    super(`OrderedProduct with orderedProductId ${OrderedProductId} not found`);
  }
}

export default OrderedProductNotFoundException;
