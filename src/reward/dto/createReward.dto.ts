import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRewardDto {
  @IsString({ each: true })
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  point: number;

  @IsNumber()
  discount: number;
  
  @IsNumber()
  expiryDay:number
}

export default CreateRewardDto;
