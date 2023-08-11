import { NotFoundException } from '@nestjs/common';

class PointManagementNotFoundException extends NotFoundException {
  constructor(orderId: number) {
    super(`PointManagements with userId ${orderId} not found`);
  }
}

export default PointManagementNotFoundException;
