import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DesertTypeDto {
  @ApiPropertyOptional()
  @IsString()
  type: string;
}
