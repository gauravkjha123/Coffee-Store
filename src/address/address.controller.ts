import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post
  } from '@nestjs/common';
  import AddressService from './address.service';
  import CreateAddressDto from './dto/createAddress.dto';
  import UpdateAddresstDto from './dto/updateAddress.dto';
  import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
  import FindOneParams from '../utils/findOneParams';

  @Controller('address')
  @UseInterceptors(ClassSerializerInterceptor)
  export default class AddressController {
    constructor(private readonly addressService: AddressService) {}
  
    @Get(':id')
    getAddressById(@Param() { id }: FindOneParams) {
      return this.addressService.getAddressById(Number(id));
    }
  
    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createAddress(@Body() address: CreateAddressDto) {
      return this.addressService.createAddress(address);
    }
  
    @Patch(':id')
    async updateAddress(
      @Param() { id }: FindOneParams,
      @Body() address: UpdateAddresstDto,
    ) {
      return this.addressService.updateAddress(Number(id), address);
    }
  
    @Delete(':id')
    async deleteAddress(@Param() { id }: FindOneParams) {
      return this.addressService.deleteAddress(Number(id));
    }
  }
  