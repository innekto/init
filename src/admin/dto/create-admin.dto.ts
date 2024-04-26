import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';
import { emailRegex, passwordRegex } from 'src/common/regexp/regexp';
import { lowerCaseTransformer } from 'src/utils/transformers/to-lower-case';

export class CreateAdminDto {
  @ApiProperty({ example: 'example@ex.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @Matches(emailRegex, { message: 'Incorrect email format' })
  @MinLength(6)
  @MaxLength(320)
  readonly email: string;

  @ApiProperty({ example: '182j2nsdk' })
  @IsString()
  @Matches(passwordRegex, {
    message:
      'the password must contain one capital letter, one digit and one special character',
  })
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
