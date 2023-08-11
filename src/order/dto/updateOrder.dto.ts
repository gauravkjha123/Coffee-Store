import { IsNotEmpty, IsEnum,IsNumber } from 'class-validator';
import OrderStatus from '../enum/order.status.enum';

export class UpdateOrderDto {
  
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status?:number

  @IsNumber()
  @IsNotEmpty()
  totalQuantity?: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount?: number;

}

export default UpdateOrderDto;
