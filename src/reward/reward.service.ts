import { Injectable, Logger ,HttpException, HttpStatus} from '@nestjs/common';
import CreateRewardDto from './dto/createReward.dto';
import Reward from './reward.entity';
import UpdateProductDto from './dto/updateReward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import LocalFilesService from '../localFiles/localFiles.service';
import RewardNotFoundException from './exceptions/rewardNotFound.exception';
import { UsersService } from '../users/users.service';

@Injectable()
export default class RewardService {
  private readonly logger = new Logger(RewardService.name);

  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    private localFilesService: LocalFilesService,
    private usersService: UsersService,

  ) {}


  async addAsset(id: number, fileData: LocalFileDto) {
    const asset = await this.localFilesService.saveLocalFileData(fileData);
    await this.rewardRepository.update(id, {
      rewardImageId: asset.id,
    });
    return asset;
  }

  async getRewards(id:number) {
    let user=await this.usersService.getById(id);
    const rewards = await this.rewardRepository.find({});
    rewards?.forEach((value)=>{
      value['isEligible']=(user.points>=value.point)?true:false;
    })
    if (rewards?.length>0) {
      return rewards;
    }
    return [];
  }

  async getRewardById(id: number) {
    const reward = await this.rewardRepository.findOne({
      where: { id }
    });
    if (reward) {
      return reward;
    }
    this.logger.warn('Tried to access a reward that does not exist');
    throw new RewardNotFoundException(id);
  }

  async getRewardByIdWithCheck(id: number,userId:number) {
    let user=await this.usersService.getById(userId);
    const reward = await this.rewardRepository.findOne({
      where: { id }
    });
    if (reward) {
      reward['isEligible']=(user.points>=reward.point)?true:false;
      return reward;
    }
    this.logger.warn('Tried to access a reward that does not exist');
    throw new RewardNotFoundException(id);
  }

  async createReward(reqward: CreateRewardDto) {
    const newreqward = this.rewardRepository.create({
      ...reqward,
    });
    await this.rewardRepository.save(newreqward);
    return newreqward;
  }

  async updateReward(id: number, reward: UpdateProductDto) {
    await this.rewardRepository.update(id, reward);
    const updatedReward = await this.rewardRepository.findOne({
      where: {
        id,
      },
    });
    if (updatedReward) {
      return updatedReward;
    }
    throw new RewardNotFoundException(id);
  }

  async deleteReward(id: number) {
    const deleteResponse = await this.rewardRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new RewardNotFoundException(id);
    }
    return deleteResponse;
  }
}
