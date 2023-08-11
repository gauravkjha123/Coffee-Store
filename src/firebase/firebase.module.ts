import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfirmationController } from './firebase.controller';

@Module({
  controllers: [ConfirmationController],
  providers: [NotificationService],
})
export class FireBaseModule {}
