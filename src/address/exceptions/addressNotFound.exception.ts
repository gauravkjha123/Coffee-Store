import { NotFoundException } from '@nestjs/common';

class AddressNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Address with id ${id} not found`);
  }
}

export default AddressNotFoundException;
