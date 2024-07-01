import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;

  @ApiProperty({ example: 'sadd', description: 'image alt' })
  imageAlt: string;

  @ApiProperty({ example: 'Name', description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Position', description: ' position' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ example: 'Position', description: ' position' })
  @IsNotEmpty()
  @IsString()
  department: string;
}
