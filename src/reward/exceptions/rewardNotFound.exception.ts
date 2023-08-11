import { NotFoundException } from '@nestjs/common';

class RewardNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Reward with id ${id} not found`);
  }
}

export default RewardNotFoundException;
