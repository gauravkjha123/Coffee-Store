import { IsNumber, IsNotEmpty,IsString,IsMobilePhone } from 'class-validator';

class OrderDetails {
  
    @IsNotEmpty()
    @IsString()
    @IsMobilePhone()
    StorePhoneNumber?:string
  
    @IsNumber()
    @IsNotEmpty()
    points:number
  
  }

export class CreatePointsFromOrder {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  orderDetials: OrderDetails[];

}

export default CreatePointsFromOrder;
