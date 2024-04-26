import { ApiProperty } from '@nestjs/swagger';

import {
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { emailRegex } from 'src/common/regexp/regexp';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/to-lower-case';

export class UpdateAdminDto {
  @ApiProperty({ example: 'example@ex.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  @Matches(emailRegex, { message: 'Incorrect email format' })
  @MinLength(6)
  @MaxLength(320)
  readonly email?: string;

  @ApiProperty({ example: 'Nick' })
  @MinLength(6)
  @MaxLength(20)
  @IsOptional()
  @IsNotEmpty()
  readonly name?: string;
}
