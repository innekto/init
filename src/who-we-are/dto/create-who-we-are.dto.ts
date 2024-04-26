import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWhoWeAreDto {
  @ApiProperty({ example: 'title', description: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'description', description: 'description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '1', description: 'imageId' })
  @IsNotEmpty()
  @IsNumber()
  imageId: number;
}
