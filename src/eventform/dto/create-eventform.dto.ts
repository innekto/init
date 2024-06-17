import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, Matches, IsNotEmpty } from 'class-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/to-lower-case';

export class CreateEventformDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

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
  @Matches(/^\+380\d{9}$/, { message: 'incorrect phone format' })
  phone: string;
}
