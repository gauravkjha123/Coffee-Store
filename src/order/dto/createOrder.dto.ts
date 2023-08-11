import { IsNumber, IsNotEmpty,IsEnum,IsOptional } from 'class-validator';
import OrderStatus from '../enum/order.status.enum';

export class CreateOrderDto {

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status:number

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  totalQuantity?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  totalAmount?: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

}

export default CreateOrderDto;
