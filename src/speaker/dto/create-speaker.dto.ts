import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpeakerDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;

  @ApiProperty({ example: 'sadd', description: 'image alt' })
  @IsNotEmpty()
  @IsString()
  imageAlt: string;

  @ApiProperty({ example: 'Name', description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
