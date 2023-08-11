import { NotFoundException } from '@nestjs/common';

class ProductNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Product with id ${id} not found`);
  }
}

export default ProductNotFoundException;
