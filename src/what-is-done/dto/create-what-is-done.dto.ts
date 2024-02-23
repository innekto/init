import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWhatIsDoneDto {
  @ApiProperty({ example: 'title', description: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'you+me', description: 'collaboration' })
  @IsNotEmpty()
  @IsString()
  collaborate: string;

  @ApiProperty({ example: 'Академія Віяр', description: 'client' })
  @IsNotEmpty()
  @IsString()
  client: string;

  @ApiProperty({ example: 'text', description: 'client' })
  @IsNotEmpty()
  @IsString()
  challenge: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;
}
