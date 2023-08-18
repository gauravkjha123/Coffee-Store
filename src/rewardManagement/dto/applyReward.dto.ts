import {  IsNotEmpty, IsNumber } from 'class-validator';

export class ApplyRewardDto {

  @IsNumber()
  @IsNotEmpty()
  rewardId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

}

export default ApplyRewardDto;
