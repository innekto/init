import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @ApiProperty({ example: 'text', description: 'challenge' })
  @IsNotEmpty()
  @IsString()
  challenge: string;

  @ApiProperty({ example: 'category', description: 'category' })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty({ example: '1', description: 'imageId' })
  @IsNotEmpty()
  @IsNumber()
  imageId: number;
}
