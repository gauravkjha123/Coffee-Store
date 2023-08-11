import { Injectable } from '@nestjs/common';
import firebaseAdmin from './firebase-config';

@Injectable()
export class NotificationService {
  async sendNotification(
    deviceToken: string,
    title: string,
    body: string,
  ): Promise<void> {
    const message = {
      notification: {
        title,
        body,
      },
      token: deviceToken,
    };

    try {
      await firebaseAdmin.messaging().send(message);
      console.log('Notification sent successfully.');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
