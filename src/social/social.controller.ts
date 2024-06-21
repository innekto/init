import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SocialService } from './social.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';

@ApiTags('social')
@ApiBearerAuth()
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @UseGuards(AdminAuthGuard)
  @Post(':memberId')
  async create(
    @Param('memberId') memberId: number,
    @Body() payload: CreateSocialDto,
  ) {
    return this.socialService.create(memberId, payload);
  }

  @Patch(':memberId')
  update(@Param('memberId') id: number, @Body() payload: UpdateSocialDto) {
    return this.socialService.update(id, payload);
  }
}
