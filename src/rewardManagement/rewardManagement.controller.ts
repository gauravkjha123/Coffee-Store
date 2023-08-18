import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import RewardManagementService from './rewardManagement.service';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import BuyRewardDto from './dto/buyReward.dto';
import ApplyRewardDto from './dto/applyReward.dto';

@Controller('rewardManagement')
@UseInterceptors(ClassSerializerInterceptor)
export default class RewardManagementController {
  constructor(private readonly rewardManagementService: RewardManagementService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getRewards(@Req() request: RequestWithUser ) {
    const { user } = request
    return this.rewardManagementService.getRewards(user.id);
  }

  @Post('buy-reward')
  @UseGuards(JwtAuthenticationGuard)
  async buyReward(@Body() buyRewardBody: BuyRewardDto) {
    return this.rewardManagementService.buyReward(buyRewardBody);
  }

  @Post('apply-reward')
  @UseGuards(JwtAuthenticationGuard)
  async applyReward(@Body() applyRewardBody: ApplyRewardDto) {
    return this.rewardManagementService.applyReward(applyRewardBody);
  }

}
