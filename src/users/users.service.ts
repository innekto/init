// import * as argon2 from 'argon2';
// import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
// import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async getAll() {
    return this.usersRepository.find();
  }

  async me(id: number) {
    const me = await this.usersRepository.findOneBy({ id });
    if (!me) {
      throw new NotFoundException();
    }
    return me;
  }
}
