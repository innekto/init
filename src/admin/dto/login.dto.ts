import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/to-lower-case';

export class AdminLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '11234567', description: 'admin password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password length must be at least 6 characters' })
  password: string;
}
