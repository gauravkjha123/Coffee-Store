import { IsNumber, IsNotEmpty } from 'class-validator';

export class SendPoints {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  recieverUserID: number;

  @IsNumber()
  @IsNotEmpty()
  points:number

}

export default SendPoints;
