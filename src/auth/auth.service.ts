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

import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import * as crypto from 'crypto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async findOneById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

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
      ...data,
      email: data.email,
      password: await argon2.hash(data.password),
      hash,
    });

    const confirmLink = `${process.env.FRONTEND_DOMAIN}/verify/${hash}`;

    await this.mailerService.sendMail({
      from: 'virchenko.vlad.2021@gmail.com',
      to: user.email,
      subject: 'Підтвердження реєстрації',
      html: `Для завершення реєстрації перейдіть за посиланням: <a href="${confirmLink}" style="font-weight: bold; color: blue;">${confirmLink}</a>
      `,
    });
  }

  async confirmEmail(hash: string): Promise<object> {
    const user = await this.usersRepository.findOne({ where: { hash } });

    if (!user) {
      throw new NotFoundException({
        error: 'wrong hash',
        status: HttpStatus.NOT_FOUND,
      });
    }

    const { token, refreshToken } = await this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const decodedToken: any = this.jwtService.decode(token, { json: true });

    user.isConfirm = true;
    user.online = true;
    user.hash = null;

    await this.usersRepository.save(user);
    return { user, token, refreshToken, tokenExpires: decodedToken.exp * 1000 };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordMatch = await argon2.verify(user.password, password);

    if (user && passwordMatch) {
      return user;
    }
    throw new UnauthorizedException('user or password are incorrect');
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user!';
    }
    const user = await this.usersRepository.findOneBy({ id: req.user.id });

    const { token, refreshToken } = await this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const decodedToken: any = this.jwtService.decode(token, { json: true });

    return {
      message: 'Successfully logged in',
      user,
      token,
      refreshToken,
      tokenExpires: decodedToken.exp * 1000,
    };
  }

  async validateGoogleUser(details) {
    const user = await this.usersRepository.findOneBy({ email: details.email });

    if (!user) {
      const newUser = this.usersRepository.create(details);
      await this.usersRepository.save(newUser);

      const crearedUser = await this.usersRepository.findOneBy({
        email: details.email,
      });

      crearedUser.isConfirm = true;
      crearedUser.online = true;

      const savedUser = this.usersRepository.save(crearedUser);

      return savedUser;
    }

    user.online = true;

    const logginedUser = await this.usersRepository.save(user);
    return logginedUser;
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      throw new BadRequestException('Wrong password');
    }

    const { token, refreshToken } = await this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const decodedToken: any = this.jwtService.decode(token, { json: true });

    user.online = true;

    await this.usersRepository.save(user);

    return {
      token,
      tokenExpires: decodedToken.exp * 1000,
      refreshToken,
      user,
    };
  }

  async adminLogin(email: string, password: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user || user.role !== 'admin') {
      throw new NotFoundException('user not found');
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      throw new BadRequestException('Wrong password');
    }

    const { token, refreshToken } = await this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const decodedToken: any = this.jwtService.decode(token, { json: true });

    user.online = true;

    await this.usersRepository.save(user);

    return {
      token,
      tokenExpires: decodedToken.exp * 1000,
      refreshToken,
      user,
    };
  }

  async refreshToken(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const { token, refreshToken } = await this.generateTokens({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const decodedToken: any = this.jwtService.decode(token, { json: true });

    return { refreshToken, token, tokenExpires: decodedToken.exp * 1000 };
  }

  async generateTokens(user: { id: number; email: string; role: string }) {
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
        role: user.role,
      }),

      await this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      token,
      refreshToken,
    };
  }

  // async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
  //   const user = await this.userService.findOne(forgotPasswordDto.email);

  //   if (!user) {
  //     throw new BadRequestException('Invalid email');
  //   }

  //   // Generate a token for password reset
  //   const token = this.jwtService.sign(
  //     { id: user.id, email: user.email },
  //     { expiresIn: '1h' },
  //   );

  //   // Construct the reset password link
  //   const resetLink = `${process.env.CLIENT_APP_URL}/auth/reset-password?token=${token}`;

  //   await this.mailerService.sendMail({
  //     from: 'virchenko.vlad.2021@gmail.com',
  //     to: user.email,
  //     subject: 'forgot password',
  //     html: `

  //               <p>Please use this <a href="${resetLink}">link</a> to reset your password.</p>
  //           `,
  //   });
  //   return { message: 'Password reset link sent successfully' };
  // }
}
