import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPingMessage(): { message: string } {
    return {
      message: 'Dogshouseservice.Version1.0.1',
    };
  }
}
