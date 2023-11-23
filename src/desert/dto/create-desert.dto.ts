import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { DesertType } from 'src/common/types/desertTypes';

export class CreateDesertDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(DesertType)
  type: DesertType;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  weight: number;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  composition: string;
}
