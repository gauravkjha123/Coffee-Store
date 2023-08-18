import { Module } from '@nestjs/common';
import Reward from './reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LocalFilesModule } from '../localFiles/localFiles.module';
import RewardController from './reward.controller';
import RewardService from './reward.service';
import { UsersModule } from '../users/users.module';
import { PointManagementModule } from '../pointManagement/pointManagement.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reward]), ConfigModule, LocalFilesModule,UsersModule,UsersModule,PointManagementModule],
  controllers: [RewardController],
  providers: [RewardService],
  exports:[RewardService]
})
export class RewardModule {}
