import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { formEmailRegex } from 'src/common/regexp/login.regexp';

export class CreateTeamFormDto {
  @ApiProperty({ example: 'Name', description: 'name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @ApiProperty({ example: 'email@.com', description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  @Matches(formEmailRegex, { message: 'Invalid format of email' })
  @MinLength(14)
  @MaxLength(72)
  email: string;

  @ApiProperty({ example: 'Designer', description: 'position' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  position: string;

  @ApiProperty({ example: 'text.....', description: 'description' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1500)
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '.pdf',
  })
  imagePath: Express.Multer.File;
}
