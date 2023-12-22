import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDesertDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  weight?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  composition?: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  flavor?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  decor?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  numberOfTiers?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  for?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  quantity?: string;
}
