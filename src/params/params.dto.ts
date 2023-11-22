import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ParamsDto {
  @ApiPropertyOptional({
    example: '1',
    description: 'Page number (by default=1)',
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'page must be a number' })
  page?: number;

  @ApiPropertyOptional({
    example: '5',
    description: 'Elements on page (by default=20)',
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'limit must be a number' })
  limit?: number;
}
