import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com', description: "user's email" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '11234567', description: "user's password" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password length must be at least 6 characters' })
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({
    example: 'notActive',
    description: "user's status",
    default: 'notActive',
    required: false,
  })
  status?: string = 'notActive'; // Поле статус тепер опціональне
}
