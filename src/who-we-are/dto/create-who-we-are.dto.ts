import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWhoWeAreDto {
  @ApiProperty({ example: 'title', description: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'description', description: 'description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;
}
