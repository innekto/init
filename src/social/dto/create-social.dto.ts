import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateSocialDto {
  @ApiProperty({ description: 'linkedIn link' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  linkedIn?: string;

  @ApiProperty({ description: 'gitHub link' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  gitHub?: string;

  @ApiProperty({ description: 'beghance link' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  behance?: string;

  @ApiProperty({ description: 'dribble link' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  dribble?: string;

  @ApiProperty({ description: 'instagram link' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  instagram?: string;

  @ValidateIf(
    (value) =>
      !value.linkedIn &&
      !value.gitHub &&
      !value.behance &&
      !value.dribble &&
      !value.instagram,
  )
  @IsNotEmpty({
    message: 'At least one field  must be specified',
  })
  readonly atLeastOneField?: string;
}
