import { Module } from '@nestjs/common';
import Address from './address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LocalFilesModule } from '../localFiles/localFiles.module';
import AddressController from './address.controller';
import AddressService from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), ConfigModule, LocalFilesModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
