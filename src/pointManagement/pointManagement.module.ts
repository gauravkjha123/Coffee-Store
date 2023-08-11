import { Module } from '@nestjs/common';
import PointManagementController from './pointManagement.controller';
import PointManagementService from './pointManagement.service';
import PointManagement from './pointManagement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointManagement]),
    ConfigModule,
    UsersModule
  ],
  controllers: [PointManagementController],
  providers: [PointManagementService],
  exports:[PointManagementService]
})
export class PointManagementModule {}
