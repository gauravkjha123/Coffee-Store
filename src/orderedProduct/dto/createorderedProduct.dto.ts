import { IsNumber, IsNotEmpty, } from 'class-validator';

export class CreateOrderedProductDto {

  @IsNumber()
  @IsNotEmpty()
  totalQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNumber()
  @IsNotEmpty()
  productId:number

  @IsNumber()
  @IsNotEmpty()
  storeId: number;

  @IsNumber()
  @IsNotEmpty()
  orderId?: number;
  
}

export default CreateOrderedProductDto;
