import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { ApiBody,ApiConsumes } from '@nestjs/swagger';
import RewardService from './reward.service';
import CreateRewardDto from './dto/createReward.dto';
import UpdateRewardtDto from './dto/updateReward.dto';
import FindOneParams from '../utils/findOneParams';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import LocalFilesInterceptor from '../localFiles/localFiles.interceptor';
import FileUploadDto from './dto/fileUpload.dto';
import RequestWithUser from '../authentication/requestWithUser.interface';
import BuyRewardDto from './dto/buyReward.dto';
import ApplyRewardDto from './dto/applyReward.dto';

@Controller('reward')
@UseInterceptors(ClassSerializerInterceptor)
export default class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getRewards(@Req() request: RequestWithUser ) {
    const { user } = request
    return this.rewardService.getRewards(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getProductById(@Param() { id }: FindOneParams,@Req() request: RequestWithUser) {
    const { user } = request;
    return this.rewardService.getRewardById(Number(id),user.id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createProduct(@Body() reward: CreateRewardDto) {
    return this.rewardService.createReward(reward);
  }

  @Post('buy-reward')
  @UseGuards(JwtAuthenticationGuard)
  async buyReward(@Body() buyRewardBody: BuyRewardDto) {
    return this.rewardService.buyReward(buyRewardBody);
  }

  @Post('apply-reward')
  @UseGuards(JwtAuthenticationGuard)
  async applyReward(@Body() applyRewardBody: ApplyRewardDto) {
    return this.rewardService.applyReward(applyRewardBody);
  }

  @Post('reward-image')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/reward',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), // 1MB
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
    type: FileUploadDto,
  })
  async addAvatar(@UploadedFile() file: any, @Body('id') id: number) {
    return this.rewardService.addAsset(id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateProduct(
    @Param() { id }: FindOneParams,
    @Body() reward: UpdateRewardtDto,
  ) {
    return this.rewardService.updateProduct(Number(id), reward);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteProduct(@Param() { id }: FindOneParams) {
    return this.rewardService.deleteReward(Number(id));
  }
}
