import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('default')
@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async hello() {
    return { message: 'hello business' };
  }
}
