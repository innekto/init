import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ example: '1', description: 'imageId' })
  @IsNotEmpty()
  @IsNumber()
  imageId: number;

  @ApiProperty({ example: 'Name', description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Position', description: 'inernal position' })
  @IsNotEmpty()
  @IsString()
  internalPosition: string;

  @ApiProperty({ example: 'Position', description: 'official position' })
  @IsNotEmpty()
  @IsString()
  officialPosition: string;
}
