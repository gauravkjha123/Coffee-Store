import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export default CreateCartDto;
