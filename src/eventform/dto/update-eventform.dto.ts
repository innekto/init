import { PartialType } from '@nestjs/swagger';
import { CreateEventformDto } from './create-eventform.dto';

export class UpdateEventformDto extends PartialType(CreateEventformDto) {}
