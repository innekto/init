import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    example: 'jbdsfkljbasfnads;lkfmdaslkmflasdmkf',
    description: 'refresh token',
  })
  @IsNotEmpty()
  @IsString()
  refresh: string;
}
