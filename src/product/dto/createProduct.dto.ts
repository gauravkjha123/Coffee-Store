import { IsString, IsNotEmpty, IsNumber,IsOptional } from 'class-validator';
import Category from '../../categories/category.entity';
import Store from '../../store/store.entity';

export class CreateProductDto {
  @IsString({ each: true })
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  category: Category;

  @IsOptional()
  stores: Store[];
}

export default CreateProductDto;
