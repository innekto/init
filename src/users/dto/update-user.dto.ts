import { PartialType } from '@nestjs/swagger';

import { AuthRegisterDto } from 'src/auth/dto/auth-register.dto';

export class UpdateUserDto extends PartialType(AuthRegisterDto) {}
