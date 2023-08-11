import { IsString, IsNotEmpty, IsNumber,IsOptional } from 'class-validator';

export class UpdateRewardtDto {
  @IsString({ each: true })
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  point: number;

  @IsNumber()
  discount: number;
}

export default UpdateRewardtDto;
