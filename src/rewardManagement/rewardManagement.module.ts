import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RewardManagement from './rewardManagement.entity';
import RewardManagementController from './rewardManagement.controller';
import RewardManagementService from './rewardManagement.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RewardModule } from '../reward/reward.module';
import { PointManagementModule } from '../pointManagement/pointManagement.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RewardManagement]),
    UsersModule,
    PointManagementModule,
    RewardModule,
    ConfigModule,
  ],
  controllers: [RewardManagementController],
  providers: [RewardManagementService],
})
export class RewardManagementModule {}
