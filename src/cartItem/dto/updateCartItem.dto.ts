import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCarItemtDto {

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  totalQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  totalAmount: number;
  
}

export default UpdateCarItemtDto;
