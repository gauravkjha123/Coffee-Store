import { Injectable, Logger } from '@nestjs/common';
import CreateAddressDto from './dto/createAddress.dto';
import Address from './address.entity';
import UpdateAddresstDto from './dto/updateAddress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AddressNotFoundException from './exceptions/addressNotFound.exception';

@Injectable()
export default class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async getAddressById(id: number) {
    try {
      const address = await this.addressRepository.findOne({
        where: { id },
        relations: {
          store:true
        },
      });
      if (address) {
        return address;
      }
      this.logger.warn('Tried to access a address that does not exist');
      throw new AddressNotFoundException(id);
    } catch (error) {
      throw error
    }
  }

  async createAddress(address: CreateAddressDto) {
    const newAddress = this.addressRepository.create({
      ...address,
    });
    await this.addressRepository.save(newAddress);
    return newAddress;
  }

  async updateAddress(id: number, address: UpdateAddresstDto) {
    await this.addressRepository.update(id, address);
    const updatedAddress = await this.addressRepository.findOne({
      where: {
        id,
      },
      relations: {
        store:true
      },
    });
    if (updatedAddress) {
      return updatedAddress;
    }
    throw new AddressNotFoundException(id);
  }

  async deleteAddress(id: number) {
    const deleteResponse = await this.addressRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new AddressNotFoundException(id);
    }
    return deleteResponse;
  }
}
