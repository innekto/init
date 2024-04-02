import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSpeakerDto {
  @ApiProperty({ example: 'Name', description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '1', description: 'imageId' })
  @IsNotEmpty()
  @IsNumber()
  imageId: number;
}
