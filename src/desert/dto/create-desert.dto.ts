import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DesertType } from 'src/common/types/desertTypes';

export class CreateDesertDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(DesertType)
  type: DesertType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  imagePath: Express.Multer.File;

  @ApiProperty()
  weight: number;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  composition: string;
}
