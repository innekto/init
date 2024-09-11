import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  Matches,
  IsNotEmpty,
  IsNumber,
  MinLength,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsValidName } from 'src/common/validators/name-validator';
import { lowerCaseTransformer } from 'src/utils/transformers/to-lower-case';

export class CreateEventformDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  @Validate(IsValidName, {
    message: 'Incorrect name',
  })
  name: string;

  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @MinLength(14)
  @MaxLength(72)
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
