import { ApiProperty } from '@nestjs/swagger';

export class ReplaceDesertImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath: Express.Multer.File;
}
