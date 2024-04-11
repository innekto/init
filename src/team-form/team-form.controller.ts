import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  ParseFilePipe,
  UseGuards,
} from '@nestjs/common';
import { TeamFormService } from './team-form.service';
import { CreateTeamFormDto } from './dto/create-team-form.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { TeamForm } from './entities/team-form.entity';
import { FileNullInterceptor } from 'src/common/interceptors/file-null.interceptor';

@Controller('team-form')
@ApiTags('team-form')
export class TeamFormController {
  constructor(private readonly teamFormService: TeamFormService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'add form by guest' })
  @ApiResponse({ type: TeamForm })
  @UseInterceptors(
    FileInterceptor('imagePath'),
    // FileNullInterceptor
  )
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.pdf' })],
      }),
    )
    file: Express.Multer.File,

    @Body() createTeamFormDto: CreateTeamFormDto,
  ) {
    return this.teamFormService.create(file, createTeamFormDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'get all forms by admin' })
  @ApiResponse({ type: [TeamForm] })
  async findAll() {
    return this.teamFormService.findAll();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete form by admin' })
  remove(@Param('id') id: number) {
    return this.teamFormService.remove(id);
  }
}
