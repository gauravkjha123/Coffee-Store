import { IsArray } from 'class-validator';

export class AddProducteDto {

  @IsArray()
  products: number[];
}

export default AddProducteDto;
