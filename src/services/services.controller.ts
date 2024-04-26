import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { Service } from './entities/service.entity';

@Controller('services')
@ApiTags('service')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'create new service by admin' })
  @ApiResponse({ type: Service })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update service by admin' })
  @ApiResponse({ type: Service })
  async update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all services/for render' })
  @ApiResponse({ type: [Service] })
  async findAll() {
    return this.servicesService.findAll();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete service by admin' })
  async remove(@Param('id') id: number) {
    return this.servicesService.remove(id);
  }
}
