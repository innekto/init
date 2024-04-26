import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BusinessFormService } from './business-form.service';
import { CreateBusinessFormDto } from './dto/create-business-form.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminAuthGuard } from 'src/auth/guards/admin.guard';

@Controller('business-form')
@ApiTags('business-form')
export class BusinessFormController {
  constructor(private readonly businessFormService: BusinessFormService) {}

  @Post()
  @ApiOperation({ summary: 'add bussines form  for cooperation' })
  async create(
    @Body()
    payload: CreateBusinessFormDto,
  ) {
    return this.businessFormService.create(payload);
  }

  @Get('all-forms')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get all business forms by admin' })
  @UseGuards(AdminAuthGuard)
  async findAll() {
    return this.businessFormService.findAll();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete form by admin' })
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: number) {
    return this.businessFormService.remove(id);
  }
}
