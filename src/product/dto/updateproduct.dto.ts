import { IsString, IsNotEmpty, IsNumber,IsOptional } from 'class-validator';
import Category from '../../categories/category.entity';

export class UpdateProductDto {
  @IsString({ each: true })
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  category: Category;
}

export default UpdateProductDto;
