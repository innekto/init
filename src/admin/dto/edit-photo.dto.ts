import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class EditPhotoDto {
  @ApiProperty({ example: '1' })
  @IsNumber()
  photoId: number;
}
