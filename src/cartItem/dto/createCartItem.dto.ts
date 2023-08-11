import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCartItemDto {

  @IsNumber()
  @IsNotEmpty()
  cartId:number

  @IsNumber()
  @IsNotEmpty()
  totalQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;
}

export default CreateCartItemDto;
