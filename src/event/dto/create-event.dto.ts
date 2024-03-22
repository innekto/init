import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: '18.04', description: 'date' })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({ example: 'Київ', description: 'location' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ example: 'Маркетинг у місті', description: 'name of event' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  speakersIds?: number[];
}
