import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import PointManagementService from './pointManagement.service';
import CreatePointManagement from './dto/createPointManagement.dto';
import CreatePointsFromOrder from './dto/createPointsFromOrder.dto';
import SendPoints from './dto/sendPoints.dto';
import FindOneParams from '../utils/findOneParams';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import SendPointsHistory from './dto/sendPointsHistory.dto';

@Controller('pointManagement')
@UseInterceptors(ClassSerializerInterceptor)
export default class PointManagementController {
  constructor(private readonly pointManagementService: PointManagementService) {}
  
  @Get('user/:id')
  @UseGuards(JwtAuthenticationGuard)
  getPointManagementsByUserId(@Param() { id }: FindOneParams) {
    return this.pointManagementService.getPointManagementsByUserId(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createOrder(@Body() createPointManagement: CreatePointManagement) {
    return this.pointManagementService.createPointManagement(createPointManagement);
  }
  
  @Post('sendPoints')
  @UseGuards(JwtAuthenticationGuard)
  async sendPoints(@Body() sendPoints: SendPoints) {
    return this.pointManagementService.sendPoints(sendPoints);
  }

  @Post('sendPointsHistory')
  @UseGuards(JwtAuthenticationGuard)
  async sendPointsHistory(@Body() body: SendPointsHistory) {
    return this.pointManagementService.sendPointsHistory(body.userId);
  }

  @Post('createPointsFromOrder')
  @UseGuards(JwtAuthenticationGuard)
  async createPointsFromOrder(@Body() body: CreatePointsFromOrder) {
    return this.pointManagementService.createPointsFromOrder(body);
  }


}
