import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBusinessFormDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  imagePath: Express.Multer.File;

  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'contact for communication' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ description: 'company name' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ description: '' })
  @IsNotEmpty()
  @IsString()
  contact: string;

  @ApiProperty({
    description: 'marketing channels/budgets for promotion/results',
  })
  @IsNotEmpty()
  @IsString()
  whatStuffsToUseNow: string;

  @ApiProperty({
    description: 'services you need',
  })
  @IsNotEmpty()
  @IsString()
  marketingWishes: string;

  @ApiProperty({ description: 'your comment' })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
