import { IsString, IsNotEmpty,IsOptional } from 'class-validator';

export class CreateAddressDto {
  
  @IsString({ each: true })
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  longitude: string;

  @IsString()
  latitude: string;

}

export default CreateAddressDto;
