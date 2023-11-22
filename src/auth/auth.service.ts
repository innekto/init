import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { ForgotPasswordDto } from './guards/auth/dto/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import * as crypto from 'crypto';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async register(data: AuthRegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException({
        error: `User with this email already exists.`,
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex')
      .slice(-6);

    const user = await this.usersRepository.save({
      email: data.email,
      password: await argon2.hash(data.password),
      hash,
    });

    await this.mailerService.sendMail({
      from: 'virchenko.vlad.2021@gmail.com',
      to: user.email,
      subject: 'Підтвердження реєстрації',
      html: `Для завершення реєстрації введіть цей код у відповідне поле: <strong>${hash}</strong>`,
    });

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        expiresIn: 30 * 60,
      },
    );

    return { user, token };
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { hash } });

    if (!user) {
      throw new NotFoundException({
        error: 'wrong hash',
        status: HttpStatus.NOT_FOUND,
      });
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordMatch = await argon2.verify(user.password, password);

    if (user && passwordMatch) {
      return user;
    }
    throw new UnauthorizedException('user or password are incorrect');
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
      refreshToken: this.jwtService.sign(
        { id: user.id, email: user.email },
        { expiresIn: '7d' },
      ),
    };
  }

  async refreshToken(user: IUser) {
    return {
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.userService.findOne(forgotPasswordDto.email);

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    // Generate a token for password reset
    const token = this.jwtService.sign(
      { id: user.id, email: user.email },
      { expiresIn: '1h' },
    );

    // Construct the reset password link
    const resetLink = `${process.env.CLIENT_APP_URL}/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      from: 'virchenko.vlad.2021@gmail.com',
      to: user.email,
      subject: 'forgot password',
      html: `
                
                <p>Please use this <a href="${resetLink}">link</a> to reset your password.</p>
            `,
    });
    return { message: 'Password reset link sent successfully' };
  }
}
