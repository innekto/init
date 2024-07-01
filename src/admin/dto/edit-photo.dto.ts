import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class EditPhotoDto {
  @ApiProperty({ example: 'admin avatar', description: 'image alt' })
  @IsOptional()
  @IsNotEmpty()
  imageAlt?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  imagePath: Express.Multer.File;
}
