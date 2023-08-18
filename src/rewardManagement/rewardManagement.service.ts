import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import RewardManagement from './rewardManagement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import BuyRewardDto from './dto/buyReward.dto';
import PointManagementService from '../pointManagement/pointManagement.service';
import { ConfigService } from '@nestjs/config';
import ApplyRewardDto from './dto/applyReward.dto';
import RewardService from '../reward/reward.service';
import CreateRewardManagementdDto from './dto/createRewardManagement.dto';
import Status from './rewardManagementStatus.enum';

@Injectable()
export default class RewardManagementService {
  private readonly logger = new Logger(RewardManagementService.name);

  constructor(
    @InjectRepository(RewardManagement)
    private rewardManagementRepository: Repository<RewardManagement>,
    private usersService: UsersService,
    private pointManagementService: PointManagementService,
    private rewardService: RewardService,
    private readonly configService: ConfigService,
  ) {}

  async buyReward(buyRewardBody: BuyRewardDto) {
    try {
      let user = await this.usersService.getById(buyRewardBody.userId);
      const reward = await this.rewardService.getRewardById(
        buyRewardBody.rewardId,
      );
      let rewardExpiryDate: Date = reward.createdAt;
      rewardExpiryDate.setDate(rewardExpiryDate.getDate() + reward.expiryDay);
      if (rewardExpiryDate < new Date() && reward.expiryDay) {
        throw new HttpException('Reward expired', HttpStatus.BAD_REQUEST);
      }
      if (user && reward && user.points >= reward.point) {
        let isRewardExist = await this.rewardManagementRepository.findOne({
          where: {
            userId: user.id,
            rewardId: reward.id,
            status:Status.ACTIVE
          },
        });
        if (isRewardExist) {
          if (
            isRewardExist.expiryDate &&
            isRewardExist.expiryDate < new Date()
          ) {
            await this.rewardManagementRepository.update(isRewardExist.id, {
              status: Status.EXPIRED,
            });
            let expiryDate: Date = new Date();
            expiryDate.setDate(expiryDate.getDate() + reward.expiryDay);
            await this.createRewardManagement({
              userId: user.id,
              rewardId: reward.id,
              expiryDate: expiryDate,
              status: Status.ACTIVE,
            });
            await this.pointManagementService.createPointManagement({
              status: 0,
              points: reward.point,
              userId: user.id,
              phoneNumber: this.configService.get('COMPANY_PHONE_NUMBER'),
            });
            return reward;
          }
          throw new HttpException(
            'Reward already exist',
            HttpStatus.BAD_REQUEST,
          );
        }
        let newrewardManagement = undefined;
        if (reward.expiryDay === 0) {
          newrewardManagement = await this.createRewardManagement({
            userId: user.id,
            rewardId: reward.id,
            expiryDate: null,
            status: Status.ACTIVE,
          });
        } else {
          let expiryDate: Date = new Date();
          expiryDate.setDate(expiryDate.getDate() + reward.expiryDay);
          newrewardManagement = await this.createRewardManagement({
            userId: user.id,
            rewardId: reward.id,
            expiryDate: expiryDate,
            status: Status.ACTIVE,
          });
        }
        await this.pointManagementService.createPointManagement({
          status: 0,
          points: reward.point,
          userId: user.id,
          phoneNumber: this.configService.get('COMPANY_PHONE_NUMBER'),
        });
        return newrewardManagement;
      }
      return {
        status: false,
        massage: 'Somethinmg went wrong',
      };
    } catch (error) {
      throw error;
    }
  }

  async applyReward(applyRewardBody: ApplyRewardDto) {
    try {
      let user = await this.usersService.getById(applyRewardBody.userId);
      const rewards = await this.rewardService.getRewardById(
        applyRewardBody.rewardId,
      );
      let finalAmount = applyRewardBody.price;
      if (user && rewards) {
        let isRewardExist = await this.rewardManagementRepository
          .createQueryBuilder('rewardManagement')
          .where('rewardManagement.userId = :userId', { userId: user.id })
          .andWhere('rewardManagement.rewardId = :rewardId', {
            rewardId: rewards.id,
          })
          .andWhere('rewardManagement.status = :status', {
            status: Status.ACTIVE,
          })
          .getOne();
        if (isRewardExist && isRewardExist.expiryDate && isRewardExist.expiryDate < new Date()) {
          await this.rewardManagementRepository.update(isRewardExist.id, {
            status: Status.EXPIRED,
          });
          return {
            status: false,
            massage: 'Reward is expired',
          };
        }
        if (isRewardExist && isRewardExist.status==Status.ACTIVE) {
          await this.rewardManagementRepository.update(isRewardExist.id, {
            status: Status.USED,
          });
          let discount = rewards.discount;
          finalAmount =
            applyRewardBody.price - applyRewardBody.price * (discount / 100);
          return {
            status: true,
            price: finalAmount,
          };
        }
        if (!isRewardExist) {
          throw new HttpException('You have not this reward to use',HttpStatus.BAD_REQUEST)
        }
      }
      if (!rewards) {
        throw new HttpException('Reward not exist',HttpStatus.BAD_REQUEST)
      }
      return {
        status: false,
        massage: 'Something went wrong',
      };
    } catch (error) {
      throw error;
    }
  }

  async getRewards(id: number) {
    let user = await this.usersService.getById(id);
    if (user) {
      const rewards = await this.rewardManagementRepository.find({
        where: { userId: user.id },
        relations: {
          reward: true,
        },
      });
      return rewards;
    }
    throw new HttpException('User Not Exist', HttpStatus.BAD_REQUEST);
  }
  async createRewardManagement(reqward: CreateRewardManagementdDto) {
    const newrewardManagement = this.rewardManagementRepository.create({
      ...reqward,
    });
    await this.rewardManagementRepository.save(newrewardManagement);
    return newrewardManagement;
  }
}
