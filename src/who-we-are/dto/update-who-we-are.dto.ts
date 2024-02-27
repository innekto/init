import { PartialType } from '@nestjs/swagger';
import { CreateWhoWeAreDto } from './create-who-we-are.dto';

export class UpdateWhoWeAreDto extends PartialType(CreateWhoWeAreDto) {}
