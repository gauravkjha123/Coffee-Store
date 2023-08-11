import { IsNumber, IsNotEmpty } from 'class-validator';

export class SendPointsHistory {

  @IsNumber()
  @IsNotEmpty()
  userId: number;

}

export default SendPointsHistory;
