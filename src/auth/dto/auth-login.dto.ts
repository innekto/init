import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/to-lower-case';
import { IsLoginConstraint } from 'src/utils/validators/login.validator';

export class AuthLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @Validate(IsLoginConstraint, { message: 'Invalid login format' })
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: '11234567', description: "user's password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password length must be at least 6 characters' })
  password: string;
}
