import { Injectable, Logger ,HttpException, HttpStatus} from '@nestjs/common';
import CreateProductDto from './dto/createReward.dto';
import Reward from './reward.entity';
import UpdateProductDto from './dto/updateReward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import LocalFilesService from '../localFiles/localFiles.service';
import RewardNotFoundException from './exceptions/rewardNotFound.exception';
import { UsersService } from '../users/users.service';
import BuyRewardDto from './dto/buyReward.dto';
import PointManagementService from '../pointManagement/pointManagement.service';
import { ConfigService } from '@nestjs/config';
import ApplyRewardDto from './dto/applyReward.dto';

@Injectable()
export default class RewardService {
  private readonly logger = new Logger(RewardService.name);

  constructor(
    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,
    private localFilesService: LocalFilesService,
    private usersService: UsersService,
    private pointManagementService: PointManagementService,
    private readonly configService: ConfigService,
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

  async buyReward(buyRewardBody: BuyRewardDto) {
    try {
      let user=await this.usersService.getById(buyRewardBody.userId);
      const reward = await this.rewardRepository.findOne({where:{id:buyRewardBody.rewardId}});
  
      if (user && reward && user.points>=reward.point) {
        await this.usersService.setReward(user.id,reward.id);
        await this.pointManagementService.createPointManagement({
          status:0,
          points:reward.point,
          userId:user.id,
          phoneNumber:this.configService.get('COMPANY_PHONE_NUMBER')
        })
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async applyReward(applyRewardBody: ApplyRewardDto) {
    try {
      let user=await this.usersService.getById(applyRewardBody.userId);
      const rewards = await this.rewardRepository.findOne({where:{id:applyRewardBody.rewardId}});
      let finalAmount=applyRewardBody.price;
      if (user && rewards && user.rewardId===rewards.id) {
        await this.usersService.setReward(user.id,null);
        let discount=rewards.discount;
        finalAmount=(applyRewardBody.price-applyRewardBody.price*(discount/100))
        return {
          status:true,price:finalAmount
        }
      }
      return {
        status:false,price:finalAmount
      };
    } catch (error) {
      
      throw error;
    }
  }

  async getRewardById(id: number,userId:number) {
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

  async createReward(reqward: CreateProductDto) {
    const newreqward = this.rewardRepository.create({
      ...reqward,
    });
    await this.rewardRepository.save(newreqward);
    return newreqward;
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    await this.rewardRepository.update(id, product);
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
