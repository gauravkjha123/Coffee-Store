import { Injectable } from '@nestjs/common';
import CreatePointManagement from './dto/createPointManagement.dto';
import SendPoints from './dto/sendPoints.dto';
import PointManagement from './pointManagement.entity';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import PointManagementNotFoundException from './exceptions/PMtNotFound.exception';
import { CreatePointsFromOrder } from './dto/createPointsFromOrder.dto';

@Injectable()
export default class PointManagementService {
  constructor(
    @InjectRepository(PointManagement)
    private pointManagementRepository: Repository<PointManagement>,
    private usersService: UsersService,
  ) {}

  async getPointManagementsByUserId(
    userId: number,
  ): Promise<PointManagement[]> {
    const pointManagements = await this.pointManagementRepository
      .createQueryBuilder('PointManagement')
      .where('PointManagement.userId=:userId', { userId: userId })
      .leftJoinAndSelect('PointManagement.user', 'u')
      .getMany();
    if (pointManagements) {
      return pointManagements;
    }
    throw new PointManagementNotFoundException(userId);
  }

  async createPointManagement(pointManagement: CreatePointManagement) {
    const newpointManagement =this.pointManagementRepository.create(pointManagement);
    await this.pointManagementRepository.save(newpointManagement);
    let user = await this.usersService.getById(pointManagement.userId);
    if (pointManagement.status==0) {
      await this.usersService.updatePoints(
        user.id,
        user.points- pointManagement.points ,
      );
    }else{
      await this.usersService.updatePoints(
        user.id,
        pointManagement.points + user.points,
      );
    }
    return newpointManagement;
  }

  async sendPoints(sendPoints: SendPoints) {
    let user = await this.usersService.getById(sendPoints.userId);
    let recieverUser = await this.usersService.getById(
      sendPoints.recieverUserID,
    );
    if (user && recieverUser && user.points>=sendPoints.points && user.id!==recieverUser.id) {
      await this.createPointManagement({
        status: 0,
        userId: user.id,
        points: sendPoints.points,
        phoneNumber: user.phoneNumber,
      });
      await this.createPointManagement({
        status: 1,
        userId: recieverUser.id,
        points: sendPoints.points,
        phoneNumber: recieverUser.phoneNumber,
      });
      return true;
    }
    return false;
  }

  async sendPointsHistory(userId: number) {
    let pointManagements = await this.pointManagementRepository.find({
      where: { userId: userId },
    });
    let res = [];
    if (pointManagements) {
      for (let index = 0; index < pointManagements.length; index++) {
        res.push({
          title: `${pointManagements[index].points} point ${
              pointManagements[index].status === 0
                ? 'sent to'
                : 'recieved from'
            } ${pointManagements[index].phoneNumber}`,
          subTitle: `on ${new Date(
            pointManagements[index].createdAt,
          ).toDateString()} at ${new Date(pointManagements[index].createdAt)
            .toTimeString()
            .slice(0, -31)}`,
          points: pointManagements[index].points,
        });
      }
    }
    return res;
  }

  async createPointsFromOrder(createPointsFromOrder: CreatePointsFromOrder) {
    let user = await this.usersService.getById(createPointsFromOrder.userId);
    let res = [];
    if (user) {
      for (
        let index = 0;
        index < createPointsFromOrder.orderDetials.length;
        index++
      ) {
        res.push(
          await this.createPointManagement({
            status: 1,
            points: createPointsFromOrder.orderDetials[index].points,
            phoneNumber:createPointsFromOrder.orderDetials[index].StorePhoneNumber,
            userId: createPointsFromOrder.userId,
          }),
        );
      }
    }
    return res;
  }
}
