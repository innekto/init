import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDesertDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  price?: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  imagePath?: Express.Multer.File;

  @ApiPropertyOptional()
  weight?: number;

  @ApiPropertyOptional({ nullable: true })
  composition?: string;
}
