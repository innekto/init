import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateServiceDto {
  @ApiProperty({ example: 'title', description: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
