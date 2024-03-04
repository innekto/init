import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ example: 'Name', description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;

  @ApiProperty({ example: 'Position', description: 'inernal position' })
  @IsNotEmpty()
  @IsString()
  internalPosition: string;

  @ApiProperty({ example: 'Position', description: 'official position' })
  @IsNotEmpty()
  @IsString()
  officialPosition: string;
}
