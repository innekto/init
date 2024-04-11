import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamFormDto {
  @ApiProperty({ example: 'Name', description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'email@.com', description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Designer', description: 'position' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ example: 'text.....', description: 'description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '.pdf',
  })
  imagePath: Express.Multer.File;
}
