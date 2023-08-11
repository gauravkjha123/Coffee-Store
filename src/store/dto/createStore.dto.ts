import { IsString, IsNotEmpty,IsOptional } from 'class-validator';

export class CreateStoreDto {
  
  @IsString({ each: true })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export default CreateStoreDto;
