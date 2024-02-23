import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'name', description: 'category name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
