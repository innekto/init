import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { MailerService } from '@nestjs-modules/mailer';

import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  // async register(data: AuthRegisterDto): Promise<void> {
  //   const existingUser = await this.usersRepository
  //     .createQueryBuilder('user')
  //     .where('user.email = :email OR user.phone = :phone', {
  //       email: data.email,
  //       phone: data.phone,
  //     })
  //     .getOne();

  //   if (existingUser) {
  //     throw new ConflictException({
  //       error: `User with this email or phone number already exists.`,
  //       status: HttpStatus.UNPROCESSABLE_ENTITY,
  //     });
  //   }

  //   const hash = crypto
  //     .createHash('sha256')
  //     .update(randomStringGenerator())
  //     .digest('hex')
  //     .slice(-6);

  //   const user = await this.usersRepository.save({
  //     ...data,
  //     email: data.email,
  //     password: await argon2.hash(data.password),
  //     hash,
  //   });

  //   await this.mailerService.sendMail({
  //     from: 'virchenko.vlad.2021@gmail.com',
  //     to: user.email,
  //     subject: 'Підтвердження реєстрації',
  //     html: `Для завершення реєстрації введіть код:${hash}`,
  //   });
  // }

  // async confirmEmail(hash: string): Promise<object> {
  //   const user = await this.usersRepository.findOne({ where: { hash } });

  //   if (!user) {
  //     throw new NotFoundException({
  //       error: 'wrong hash',
  //       status: HttpStatus.NOT_FOUND,
  //     });
  //   }

  //   const { token, refreshToken } = await this.generateTokens({
  //     id: user.id,
  //     email: user.email,
  //     role: user.role,
  //   });

  //   const decodedToken: any = this.jwtService.decode(token, { json: true });

  //   user.isConfirm = true;
  //   user.online = true;
  //   user.hash = null;

  //   await this.usersRepository.save(user);
  //   return { user, token, refreshToken, tokenExpires: decodedToken.exp * 1000 };
  // }

  // async refreshToken(id: number) {
  //   const user = await this.usersRepository.findOneByOrFail({ id });

  //   if (!user) {
  //     throw new NotFoundException('user not found');
  //   }

  //   const { token, refreshToken } = await this.generateTokens({
  //     id: user.id,
  //     email: user.email,
  //     role: user.role,
  //   });

  //   const decodedToken: JwtPayload = this.jwtService.decode(token, {
  //     json: true,
  //   });
  //   console.log('decodedToken', decodedToken);

  //   return { refreshToken, token, tokenExpires: decodedToken.exp * 1000 };
  // }

  async generateTokens(user: { id: number; email: string; role: string }) {
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync({
        id: user.id,
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
