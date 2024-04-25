import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { nameRegexp, webUrlsRegexp } from 'src/common/regexp/regexp';

export class CreateBusinessFormDto {
  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  @IsString()
  @Matches(nameRegexp, { message: 'Invalid format of name' })
  name: string;

  @ApiProperty({ description: 'contact for communication' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ description: 'company name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  companyName: string;

  @ApiProperty({ description: '' })
  @IsNotEmpty()
  @IsString()
  contact: string;

  @ApiProperty({ description: 'website url' })
  @IsNotEmpty()
  @IsString()
  @Matches(webUrlsRegexp, { message: 'Invalid format of webUrl' })
  webUrl: string;

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
