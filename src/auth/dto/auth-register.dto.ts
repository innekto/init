import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  Matches,
  IsNotEmpty,
  IsString,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/to-lower-case';

export class AuthRegisterDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @Matches(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
    message: 'Incorrect email',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+380509999999' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ example: '11234567', description: "user's password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password length must be at least 6 characters' })
  password: string;
}
