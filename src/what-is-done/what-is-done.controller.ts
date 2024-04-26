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
import { WhatIsDoneService } from './what-is-done.service';
import { CreateWhatIsDoneDto } from './dto/create-what-is-done.dto';
import { UpdateWhatIsDoneDto } from './dto/update-what-is-done.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { WhatIsDone } from './entities/what-is-done.entity';

@ApiTags('what-is-done')
@Controller('what-is-done')
export class WhatIsDoneController {
  constructor(private readonly whatIsDoneService: WhatIsDoneService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'create new cooool by admin' })
  @ApiResponse({ type: WhatIsDone })
  create(
    @Body() createWhatIsDoneDto: CreateWhatIsDoneDto,
  ): Promise<WhatIsDone> {
    return this.whatIsDoneService.create(createWhatIsDoneDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update cooool by admin' })
  @ApiResponse({ type: WhatIsDone })
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id') id: number,
    @Body() payload: UpdateWhatIsDoneDto,
  ): Promise<WhatIsDone> {
    return this.whatIsDoneService.update(id, payload);
  }

  @Get(':category')
  @ApiOperation({ summary: 'get cooools by category' })
  @ApiResponse({ type: [WhatIsDone] })
  async findByCategory(@Param('category') category: string) {
    return this.whatIsDoneService.findAllInCategory(category);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete by admin' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: number) {
    return this.whatIsDoneService.remove(id);
  }
}
