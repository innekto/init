import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDesertDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ nullable: false })
  @IsOptional()
  @IsNotEmpty()
  price?: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsNotEmpty()
  imagePath?: Express.Multer.File;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  weight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  composition?: string;
}
