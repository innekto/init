import * as argon2 from 'argon2';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  // async create(createUserDto: CreateUserDto) {
  //   const existUser = await this.usersRepository.findOne({
  //     where: { email: createUserDto.email },
  //   });
  //   console.log('existUser', existUser);
  //   if (existUser) throw new ConflictException('email already exist');

  //   const hash = crypto
  //     .createHash('sha256')
  //     .update(randomStringGenerator())
  //     .digest('hex');

  //   const user = await this.usersRepository.save({
  //     email: createUserDto.email,
  //     password: await argon2.hash(createUserDto.password),
  //     status: createUserDto.status,
  //     hash,
  //   });

  //   const confirmLink = `http://localhost:3000/verify/email/${hash}`;

  //   await this.mailerService.sendMail({
  //     from: 'virchenko.vlad.2021@gmail.com',
  //     to: user.email,
  //     subject: 'Підтвердження реєстрації',
  //     html: `Для завершення реєстрації перейдіть за посиланням: <a href="${confirmLink}">${confirmLink}</a>`,
  //   });

  //   const token = await this.jwtService.signAsync(
  //     {
  //       id: user.id,
  //       email: user.email,
  //     },
  //     {
  //       expiresIn: 30, // Термін дії токену в секундах
  //     },
  //   );

  //   const decodedToken = await this.jwtService.verifyAsync(token);
  //   console.log('decodedToken', decodedToken);
  //   return { user, token };
  // }

  async findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
