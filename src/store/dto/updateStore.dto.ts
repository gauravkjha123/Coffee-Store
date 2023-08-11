import { IsString, IsNotEmpty,IsOptional } from 'class-validator';

export class UpdateStoretDto {

  @IsString({ each: true })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

export default UpdateStoretDto;
