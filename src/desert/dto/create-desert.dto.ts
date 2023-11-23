import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDesertDto {
  @ApiProperty()
  @IsNotEmpty()
  type: string;

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
