import { NotFoundException } from '@nestjs/common';

class StoreNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Store with id ${id} not found`);
  }
}

export default StoreNotFoundException;
