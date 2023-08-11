import { IsArray } from 'class-validator';

export class UpdateProducteDto {

  @IsArray()
  products: number[];
}

export default UpdateProducteDto;
