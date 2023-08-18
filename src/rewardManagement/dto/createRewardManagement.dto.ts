import { IsNotEmpty, IsNumber,IsDate,IsEnum } from 'class-validator';
import Status from '../rewardManagementStatus.enum';

export class CreateRewardManagementdDto {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  rewardId: number;

  @IsDate()
  @IsNotEmpty()
  expiryDate:Date

  @IsEnum(Status)
  status:Status
}

export default CreateRewardManagementdDto;
