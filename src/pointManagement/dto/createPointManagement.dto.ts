import { IsNumber, IsNotEmpty,IsEnum,IsString,IsMobilePhone } from 'class-validator';
import PointStatus from '../enum/pointtStatus.enum';

export class CreatePointManagement {

  @IsNotEmpty()
  @IsEnum(PointStatus)
  status:number

  @IsNotEmpty()
  @IsString()
  @IsMobilePhone()
  phoneNumber?:string

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  points:number
}

export default CreatePointManagement;
