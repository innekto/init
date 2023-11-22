import { PartialType } from '@nestjs/swagger';
import { CreateDesertDto } from './create-desert.dto';

export class UpdateDesertDto extends PartialType(CreateDesertDto) {}
