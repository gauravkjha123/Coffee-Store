import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class BuyRewardDto {

  @IsNumber()
  @IsNotEmpty()
  rewardId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export default BuyRewardDto;
