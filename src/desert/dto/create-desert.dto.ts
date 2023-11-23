import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDesertDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

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
  recipe: string;
}
