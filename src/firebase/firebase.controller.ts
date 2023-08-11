import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

class SendNotification {
  id: string;
}

@Controller('notification')
export class ConfirmationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('sendNotification')
  async confirmEmail(@Body() body: SendNotification): Promise<string> {
    const deviceToken = 'DEVICE_TOKEN_GOES_HERE';
    const title = 'Email Confirmed';
    const emailBody = 'Your email has been successfully confirmed!';
    try {
      await this.notificationService.sendNotification(
        deviceToken,
        title,
        emailBody,
      );
    } catch (error) {
      return error;
    }

    return 'Email confirmed successfully';
  }
}
