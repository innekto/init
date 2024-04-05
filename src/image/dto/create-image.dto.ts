import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;

  @ApiProperty({ example: 'cats', description: 'description' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;
}
