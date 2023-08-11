import { IsNotEmpty, IsNumber,IsArray } from 'class-validator';

export class CreateOrderFromCartItemstDto {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  carTItems: number[];
  
}

export default CreateOrderFromCartItemstDto;
